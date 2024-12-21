import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export const useWebVitals = () => {
  const reportWebVitals = (metric) => {
    // Log metrics to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(metric);
    }
    
    // In production, you could send to an analytics service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Google Analytics
      if (window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta,
        });
      }
    }
  };

  getCLS(reportWebVitals);
  getFID(reportWebVitals);
  getFCP(reportWebVitals);
  getLCP(reportWebVitals);
  getTTFB(reportWebVitals);
};