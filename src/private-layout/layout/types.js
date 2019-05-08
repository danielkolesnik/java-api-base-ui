
// local dependencies

export default (prefix => {
    return {
        PREFIX: new RegExp(prefix, 'i'),
        // simple action
        DATA: `${prefix}DATA`,
        CLEAR: `${prefix}CLEAR`,
        // complex actions
        TOGGLE_ASIDE: `${prefix}TOGGLE_ASIDE`,
        SUBMIT_SEARCH_FORM: `${prefix}SUBMIT_SEARCH_FORM`,
    };
})('@layout/');
