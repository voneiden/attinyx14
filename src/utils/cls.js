const cls = function cls(...args) {
    return args.filter(arg => arg).join(' ')
};

export default cls;