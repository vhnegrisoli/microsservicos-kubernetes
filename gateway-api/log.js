export default (req, res, status, type) => {
    let body = req.body ? JSON.stringify(req.body) : null;
    let params = req.params ? JSON.stringify(req.params) : null;
    let query = req.query ? JSON.stringify(req.query) : null;
    let { tracing } = req.headers;
    let method = req.method;
    let url = req.url;

    let message = '';

    if (type === 'REQUEST') {
        message = `Request  ${method} - ${url}: Body [${body}] | Tracing [${tracing}] | Params [${params} | Query[${query}]`;
    }
    if (type === 'RESPONSE') {
        message = `Response ${method} - ${url}: Response [${res}] | Status [${status}] | Body [${body}] | Tracing [${tracing}] | Params [${params} | Query[${query}]`;
    }

    console.info(message);
}