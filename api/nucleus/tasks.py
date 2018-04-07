from threading import Thread

import requests
from django.contrib.auth import get_user_model

User = get_user_model()


class OPENDOTA:
    PLAYERS = "https://api.opendota.com/api/players/{account_id}"


RANK_TIERS = [
    'Uncalibrated',
    'Herald',
    'Guardian',
    'Crusader',
    'Archon',
    'Legend',
    'Ancient',
    'Divine',
]


STEAM32_MODIFIER = 76561197960265728


def rank_tier_to_string(rank_tier, leaderboard_tier):
    rank_tier_int = int(rank_tier)
    tier = rank_tier // 10
    tier_name = RANK_TIERS[tier]

    if rank_tier_int > 9:
        tier_name = "{} [{}]".format(tier_name, rank_tier_int % 10)

    return tier_name


def _update_player_mmr(user_id):
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return

    social_auth = user.social_auth.filter(provider='steam').first()

    if not social_auth:
        return

    steamid = social_auth.extra_data['player'].get('steamid')
    if not steamid:
        return

    steamid32 = int(steamid) - STEAM32_MODIFIER
    url = OPENDOTA.PLAYERS.format(account_id=steamid32)
    response = requests.get(url)
    json = response.json()

    rank_tier = int(json['rank_tier'])
    leaderboard_rank = json['leaderboard_rank']

    rank_data = {
        'rank_int': rank_tier,
        'rank_leaderboard': leaderboard_rank,
        'rank': rank_tier_to_string(rank_tier, leaderboard_rank)
    }
    social_auth.extra_data['rank_data'] = rank_data
    social_auth.save()


def update_player_mmr(user_id):
    Thread(target=_update_player_mmr, args=(user_id, )).start()
