"use strict";
// Selector Elements
const inputRange = document.querySelector('#pageviews');
const inputCheck = document.querySelector('#period');
const spanViews = document.querySelector('#views');
const spanTimePeriod = document.querySelector('#time-period');
const spanPrice = document.querySelector('#price');
// Values
const percentDiscountYearly = 25;
const views = ['10K', '50K', '100K', '500K', '1M'];
const priceMonthly = [8, 12, 16, 25, 36];
const priceYearly = [];
window.onload = () => {
    // Generate Discount Yearly Price
    priceMonthly.forEach((price) => {
        priceYearly.push(price - (price * percentDiscountYearly) / 100);
    });
    // Format Number
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const renderPrice = () => {
        if (inputCheck.checked) {
            const currentPrice = priceYearly[inputRange.valueAsNumber];
            spanPrice.innerText = `${formatter.format(currentPrice)}`;
        }
        else {
            const currentPrice = priceMonthly[inputRange.valueAsNumber];
            spanPrice.innerText = `${formatter.format(currentPrice)}`;
        }
    };
    inputRange.addEventListener('input', (event) => {
        const target = event.target;
        spanViews.innerText = views[target.valueAsNumber];
        renderPrice();
    });
    inputCheck.addEventListener('change', (event) => {
        const target = event.target;
        if (target.checked) {
            spanTimePeriod.innerText = 'yearly';
        }
        else {
            spanTimePeriod.innerText = 'monthly';
        }
        renderPrice();
    });
};
