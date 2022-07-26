export enum StatusGoogle {
    OK = <any>"indicating the API request was successful.",
    ZERO_RESULTS = <any>"indicating that the search was successful but returned no results. This may occur if the search was passed a latlng in a remote location.",
    INVALID_REQUEST = <any>"indicating the API request was malformed, generally due to missing required query parameter (location or radius).",
    OVER_QUERY_LIMIT = <any>"indicating any of the following: (1) You have exceeded the QPS limits. (2) Billing has not been enabled on your account. (3) The monthly $200 credit, or a self-imposed usage cap, has been exceeded. (4) The provided method of payment is no longer valid (for example, a credit card has expired). (5)",
    REQUEST_DENIED = <any>"indicating that your request was denied, generally because: (1) The request is missing an API key. (2) The key parameter is invalid.",
    UNKNOWN_ERROR = <any>"indicating an unknown error.",
}
