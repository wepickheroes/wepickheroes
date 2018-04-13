import React from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/fontawesome-free-solid'

export const ContentContainer = styled.div`
    margin: 2rem 0;
`
export const Divider = styled.div`
    margin-bottom: 8rem;
`
export const MarketingImage = styled.img`
    border-radius: 25px;
`
export const BrandImage = styled.img`
    max-height:100%;
`

export const Loading = ({ size = 2 }) => (
    <div className='text-center'>
        <FontAwesomeIcon icon={faCog} size={`${size}x`} spin />
        <span style={{ fontSize: '20px' }}>&nbsp;Loading...</span>
    </div>
)
