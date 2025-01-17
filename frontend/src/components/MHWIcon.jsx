import React from 'react';
import { IconButton } from '@mui/material';

export default function MHWIcon() {
    return (
        <IconButton title="Visit the MHW website" position='' size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <a href="https://mwh.muhammadiyah.org.sg/" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://mwh.muhammadiyah.org.sg/wp-content/uploads/2021/06/mwh-esig-footer-062.png" style={{ height: '60px', width: 'auto' }} alt="MUHAMMADIYAH WELFARE HOME" id="logo"/>
            </a>
        </IconButton>
    )
}