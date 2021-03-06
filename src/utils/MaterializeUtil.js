const initSidenav = (selector, params = {}) => {
    const elem = document.querySelector(selector)
    window.M.Sidenav.init(elem, params)
}

const toast = (text, params) => {
    const defaultParams = {
        classes: 'rounded',
        activationPercent: 0.4,
        displayLength: 3000
    }
    const obj = Object.assign(defaultParams, { html: text }, params)
    window.M.toast(obj)
}

const toastError = (text, params = { classes: 'rounded error' }) => {
    toast(text, params)
}

const toastSuccess = (text, params = { classes: 'rounded success' }) => {
    toast(text, params)
}

const initCollapsible = (selector, params = {}) => {
    const elem = document.querySelector(selector)
    window.M.Collapsible.init(elem, params)
}

const initDatepicker = (selector, params = {}) => {
    const elem = document.querySelector(selector)
    window.M.Datepicker.init(elem, params)
}

const initSelect = (selector, params = {}) => {
    const elem = document.querySelector(selector)
    window.M.FormSelect.init(elem, params)
}

export { initSidenav, toast, toastError, toastSuccess, initCollapsible, initDatepicker, initSelect }