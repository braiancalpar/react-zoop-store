import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import type { VitalsConfig, VitalsMetricData, Metric } from '../types/Vitals';

class VitalsMonitor {
  private config: VitalsConfig = {
    enableConsoleLog: import.meta.env.DEV,
  };

  private isInitialized = false;

  public init(config?: VitalsConfig): void {
    if (this.isInitialized) {
      console.warn('VitalsMonitor já foi inicializado');
      return;
    }

    this.config = {
      ...this.config,
      ...config,
    };

    onCLS(this.handleMetric.bind(this), this.config.reportOpts);
    onFCP(this.handleMetric.bind(this), this.config.reportOpts);
    onINP(this.handleMetric.bind(this), this.config.reportOpts);
    onLCP(this.handleMetric.bind(this), this.config.reportOpts);
    onTTFB(this.handleMetric.bind(this), this.config.reportOpts);

    this.isInitialized = true;

    if (this.config.enableConsoleLog) {
      console.log('✅ Web Vitals monitoring inicializado');
    }
  }

  private handleMetric(metric: Metric): void {
    const data: VitalsMetricData = {
      name: metric.name as VitalsMetricData['name'],
      value: metric.value,
      id: metric.id,
      rating: metric.rating,
      delta: metric.delta,
      timestamp: Date.now(),
      navigationType: metric.navigationType,
    };

    if (this.config.enableConsoleLog) {
      this.logMetric(data);
    }

    if (this.config.onReport) {
      try {
        this.config.onReport(data);
      } catch (error) {
        console.error('Erro ao reportar métrica', error);
      }
    }
  }

  private logMetric(metric: VitalsMetricData): void {
    const emoji = this.getRatingEmoji(metric.rating);
    const value = this.formatMetricValue(metric);

    console.log(`${emoji} [Web Vitals] ${metric.name}: ${value} (${metric.rating})`);
  }

  private getRatingEmoji(rating: VitalsMetricData['rating']): string {
    switch (rating) {
      case 'good':
        return '✅';
      case 'needs-improvement':
        return '⚠️';
      case 'poor':
        return '❌';
      default:
        return '📊';
    }
  }

  private formatMetricValue(metric: VitalsMetricData): string {
    const { name, value } = metric;

    // CLS não tem unidade (é um score)
    if (name === 'CLS') {
      return value.toFixed(3);
    }

    // Outras métricas são em milissegundos
    if (value < 1000) {
      return `${Math.round(value)}ms`;
    }

    // Converter para segundos se > 1000ms
    return `${(value / 1000).toFixed(2)}s`;
  }

  public getConfig(): Readonly<VitalsConfig> {
    return { ...this.config };
  }

  public isActive(): boolean {
    return this.isInitialized;
  }
}

export const vitalsMonitor = new VitalsMonitor();
export default vitalsMonitor;
