/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import linkedinIcon from 'Style/icons/logos/linkedIn.svg';

import appStoreLogo from '../../style/icons/logos/app store.svg';
import appleIcon from '../../style/icons/logos/Apple_Pay-Logo.wine.svg';
import cashIcon from '../../style/icons/logos/CASH.svg';
import facebookIcon from '../../style/icons/logos/facebook.svg';
import googlePlayLogo from '../../style/icons/logos/google play.svg';
import instgrameIcon from '../../style/icons/logos/instagram-round-color.svg';
import madaIcon from '../../style/icons/logos/Mada_Logo.svg';
import masterIcon from '../../style/icons/logos/mastercard-4-logo-svgrepo-com.svg';
import snapIcon from '../../style/icons/logos/snapchat-round-color.svg';
import stcIcon from '../../style/icons/logos/stc pay.svg';
import tappyIcon from '../../style/icons/logos/tabby.svg';
import tamaraIcon from '../../style/icons/logos/tamara.svg';
import twitterIcon from '../../style/icons/logos/twitter-round-color.svg';
import visaIcon from '../../style/icons/logos/visa-logo-svgrepo-com.svg';
import EmailIconComponent from '../EmailIcon/EmailIcon.component';
import PhoneIconComponent from '../PhoneIcon/PhoneIcon.component';
import WhatsAppIconComponent from '../WhatsAppIcon/WhatsAppIcon.component';

export const RENDER_NEWSLETTER = 'render_newsletter';
export const RENDER_LOGO = 'render_logo';

export const NEWSLETTER_COLUMN = {
    title: __('Subscribe to our newsletter to receive our news'),
    columnActiveKey: 'newsletterActive',
    isItemsHorizontal: true,
    items: [
        {
            render: RENDER_NEWSLETTER
        }
    ]
};

export const LOGO_COLUMN = {
    title: __('logo'),
    isItemsHorizontal: true,
    items: [
        {
            render: RENDER_LOGO
        }
    ]
};

// eslint-disable-next-line import/prefer-default-export
export const COLUMN_MAP = [
    {
        title: __('About'),
        items: [
            {
                href: '/about-us',
                title: __('About Us')
            }
        ]
    },
    {
        title: __('Additional info'),
        items: [
            {
                href: '/privacy-policy-cookie-restriction-mode',
                title: __('Privacy Policy')
            },
            {
                href: '/terms-and-conditions',
                title: __('Terms of use')
            },
            {
                href: '/privacy-policy-cookie-restriction-mode',
                title: __('Use of Cookies')
            }
        ]
    },
    {
        title: __('Popular categories'),
        items: [
            {
                href: '/women',
                title: __('Women')
            },
            {
                href: '/men',
                title: __('Men')
            },
            {
                href: '/accessories',
                title: __('Accessories')
            }
        ]
    },
    {
        title: __('Follow'),
        isItemsHorizontal: true,
        items: [
            {
                href: 'https://www.linkedin.com/company/scandipwa',
                src: linkedinIcon,
                title: __('LinkedIn')
            },
            {
                href: 'https://www.facebook.com/ScandiPWA/',
                src: facebookIcon,
                title: __('Facebook')
            },
            {
                href: 'https://twitter.com/scandipwa',
                src: twitterIcon,
                title: __('Twitter')
            }
        ]
    },
    NEWSLETTER_COLUMN
];
export const CONTACTS_COLUMNS = {
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/no-jsx-variables
    items: [
        {
            title: __('WhatsApp contact'),
            label: __('Contact us on WhatsApp'),
            icon: <WhatsAppIconComponent />,
            value: 'whatsapp'
        },
        {
            title: __('Send an email'),
            label: '',
            icon: <EmailIconComponent />,
            value: 'email'
        },
        {
            title: __('Phone support'),
            label: '',
            icon: <PhoneIconComponent />,
            value: 'mobile'
        }
    ]
};

export const SOCIAL_ICONS = {
    icons: [
        {
            key: 'twitter',
            value: twitterIcon
        },
        {
            key: 'facebook',
            value: facebookIcon
        },
        {
            key: 'linkedin',
            value: linkedinIcon
        },
        {
            key: 'snap',
            value: snapIcon
        },
        {
            key: 'instagram',
            value: instgrameIcon
        }
    ]
};
export const PAYMENT_METHODS = {
    title: __('Accepted Payment Methods'),
    isItemsHorizontal: true,
    items: [
        {
            src: cashIcon,
            title: __('Cash')
        },
        {
            src: visaIcon,
            title: __('Visa')
        },
        {
            src: masterIcon,
            title: __('Master')
        },
        {
            src: madaIcon,
            title: __('Mada')
        },
        {
            src: stcIcon,
            title: __('Stc Pay')
        },
        {
            src: appleIcon,
            title: __('Apple Pay')
        },
        {
            src: tappyIcon,
            title: __('Tappy')
        },
        {
            src: tamaraIcon,
            title: __('Tamara')
        }
    ]
};
export const APPS_LOGOS = {
    title: __('Download the app now!'),
    isItemsHorizontal: true,
    items: [
        {
            href: '#',
            src: appStoreLogo,
            title: __('App Store'),
            ratio: 'custom'
        },
        {
            href: '#',
            src: googlePlayLogo,
            title: __('Google Play'),
            ratio: 'custom'
        }
    ]
};
export const STATIC_PAGES_COLUMN = {
    title: __('Help'),
    items: []
};
export const SOCIAL_COLUMN = {
    title: __('Follow us'),
    isItemsHorizontal: true,
    items: []
};
