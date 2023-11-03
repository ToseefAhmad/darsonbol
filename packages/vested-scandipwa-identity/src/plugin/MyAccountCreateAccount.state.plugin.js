/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Zintis Scerbakovs <info@scandiweb.com>
 * @copyright Copyright (c) 2021 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

/** @namespace Vested/ScandipwaIdentity/Plugin/MyAccountCreateAccount/State */
export class MyAccountCreateAccountStatePlugin {
    mapStateToProps = (args, callback, instance) => {
        const [state] = args;

        return {
            ...callback.apply(instance, args),
            logins: state.IdentityReducer.logins,
            isSocialLoginsLoading: state.IdentityReducer.isLoading
        };
    };
}

export const { mapStateToProps } = new MyAccountCreateAccountStatePlugin();

export default {
    'Component/MyAccountCreateAccount/Container/mapStateToProps': {
        function: mapStateToProps
    }
};
