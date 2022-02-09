// Selector Elements
const inputRange = document.querySelector('#pageviews') as HTMLInputElement;
const inputCheck = document.querySelector('#period') as HTMLInputElement;

const spanViews = document.querySelector('#views') as HTMLSpanElement;
const spanTimePeriod = document.querySelector(
  '#time-period'
) as HTMLSpanElement;
const spanPrice = document.querySelector('#price') as HTMLSpanElement;

// Values
const percentDiscountYearly = 25;
const views: string[] = ['10K', '50K', '100K', '500K', '1M'];
const priceMonthly = [8, 12, 16, 25, 36];
const priceYearly: number[] = [];

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
    } else {
      const currentPrice = priceMonthly[inputRange.valueAsNumber];
      spanPrice.innerText = `${formatter.format(currentPrice)}`;
    }
  };

  inputRange.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement;

    target.style.backgroundImage = `
      linear-gradient(
        to right,
        var(--soft-cyan) 0%,
        var(--soft-cyan) ${target.valueAsNumber * 25}%,
        var(--empty-bar) ${target.valueAsNumber * 25}%,
        var(--empty-bar) 100%
      )
    `;

    spanViews.innerText = views[target.valueAsNumber];
    renderPrice();
  });

  inputCheck.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      spanTimePeriod.innerText = 'yearly';
    } else {
      spanTimePeriod.innerText = 'monthly';
    }
    renderPrice();
  });
};
