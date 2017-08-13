import WPAPI from 'wpapi'
const wp = new WPAPI({
    endpoint: window.five_recent_api.root,
    nonce: window.five_recent_api.nonce
})
export default wp
