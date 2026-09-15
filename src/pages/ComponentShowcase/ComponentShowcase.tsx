/**
 * Component Showcase Page
 *
 * Showcase completo do design system com todos os componentes
 */

import React, { useState } from 'react';
import Container from '../../components/layout/Container';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import Spinner from '../../components/common/Spinner';
import Rating from '../../components/common/Rating';
import ProductPrice from '../../components/product/ProductPrice';
import ProductCard from '../../components/product/ProductCard';
import CategoryNav from '../../components/product/CategoryNav';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../../mocks/data';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="mb-16">
    <Typography
      as="h2"
      variant="heading"
      weight="bold"
      className="mb-6 pb-2 border-b-2 border-magenta-500"
    >
      {title}
    </Typography>
    <div className="space-y-6">{children}</div>
  </div>
);

interface DemoProps {
  label: string;
  children: React.ReactNode;
}

const Demo: React.FC<DemoProps> = ({ label, children }) => (
  <div>
    <Typography
      variant="caption"
      weight="semibold"
      color="text-grafite-600"
      className="mb-3 uppercase"
    >
      {label}
    </Typography>
    <div className="p-6 bg-white rounded-lg border border-cinza-200">{children}</div>
  </div>
);

const ComponentShowcase: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="py-12 bg-cinza-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <Typography as="h1" variant="display" weight="extrabold" gradient className="mb-4">
            Design System
          </Typography>
          <Typography variant="title" color="text-grafite-600">
            Biblioteca completa de componentes do Zoop Store
          </Typography>
        </div>

        {/* Design Tokens */}
        <Section title="Design Tokens">
          <Demo label="Cores">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="h-20 bg-magenta-500 rounded-lg mb-2" />
                <Typography variant="caption">Magenta</Typography>
              </div>
              <div className="text-center">
                <div className="h-20 bg-azul-500 rounded-lg mb-2" />
                <Typography variant="caption">Azul</Typography>
              </div>
              <div className="text-center">
                <div className="h-20 bg-verde-500 rounded-lg mb-2" />
                <Typography variant="caption">Verde</Typography>
              </div>
              <div className="text-center">
                <div className="h-20 bg-cinza-500 rounded-lg mb-2" />
                <Typography variant="caption">Cinza</Typography>
              </div>
              <div className="text-center">
                <div className="h-20 bg-grafite-600 rounded-lg mb-2" />
                <Typography variant="caption">Grafite</Typography>
              </div>
            </div>
          </Demo>

          <Demo label="Tipografia">
            <div className="space-y-4">
              <Typography as="h1" variant="display" weight="bold">
                Display - Montserrat Bold
              </Typography>
              <Typography as="h2" variant="heading" weight="semibold">
                Heading - Montserrat Semibold
              </Typography>
              <Typography as="h3" variant="title" weight="medium">
                Title - Montserrat Medium
              </Typography>
              <Typography variant="body">Body - Montserrat Regular</Typography>
              <Typography variant="caption">Caption - Montserrat Regular</Typography>
            </div>
          </Demo>
        </Section>

        {/* Common Components */}
        <Section title="Componentes Common">
          <Demo label="Typography Variants">
            <div className="space-y-4">
              <Typography as="h1" variant="display" weight="bold">
                Display Text
              </Typography>
              <Typography as="h2" variant="heading">
                Heading Text
              </Typography>
              <Typography as="h3" variant="title" gradient>
                Title with Gradient
              </Typography>
              <Typography variant="body" color="text-grafite-600">
                Body text with color
              </Typography>
              <Typography variant="caption">Caption text</Typography>
            </div>
          </Demo>

          <Demo label="Buttons">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" loading>
                Loading
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>
          </Demo>

          <Demo label="Button Sizes">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
            </div>
          </Demo>

          <Demo label="Inputs">
            <div className="space-y-4 max-w-md">
              <Input
                type="text"
                placeholder="Text input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email input"
                leftIcon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
              />
              <Input type="search" placeholder="Search input" error="Este campo é obrigatório" />
            </div>
          </Demo>

          <Demo label="Badges">
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="success" size="sm">
                Small
              </Badge>
            </div>
          </Demo>

          <Demo label="Spinners">
            <div className="flex gap-6 items-center">
              <Spinner size="sm" color="primary" />
              <Spinner size="md" color="secondary" />
              <Spinner size="lg" color="primary" />
            </div>
          </Demo>

          <Demo label="Rating">
            <div className="space-y-3">
              <Rating rating={5} totalReviews={128} />
              <Rating rating={4.5} showNumber />
              <Rating rating={3} size="sm" />
              <Rating rating={2.5} size="lg" totalReviews={42} />
            </div>
          </Demo>
        </Section>

        {/* Product Components */}
        <Section title="Componentes Product">
          <Demo label="ProductPrice">
            <div className="space-y-3">
              <ProductPrice price={2800} discountPercentage={15} showBadge />
              <ProductPrice price={1500} size="lg" />
              <ProductPrice price={599} discountPercentage={20} size="sm" />
            </div>
          </Demo>

          <Demo label="CategoryNav">
            <CategoryNav
              categories={MOCK_CATEGORIES}
              activeCategory={activeCategory}
              onCategoryClick={setActiveCategory}
            />
          </Demo>

          <Demo label="ProductCard">
            <div className="max-w-xs">
              <ProductCard
                product={MOCK_PRODUCTS[0]}
                onAddToCart={(id) => console.log('Add to cart:', id)}
                onClick={(id) => console.log('Click:', id)}
              />
            </div>
          </Demo>

          <Demo label="ProductCard - Loading">
            <div className="max-w-xs">
              <ProductCard product={MOCK_PRODUCTS[0]} loading />
            </div>
          </Demo>
        </Section>

        {/* Utilities */}
        <Section title="Utilities Classes">
          <Demo label="Gradients">
            <div className="space-y-3">
              <div className="gradient-primary h-16 rounded-lg flex items-center justify-center text-white font-semibold">
                gradient-primary
              </div>
              <div className="gradient-secondary h-16 rounded-lg flex items-center justify-center text-white font-semibold">
                gradient-secondary
              </div>
              <div className="gradient-accent h-16 rounded-lg flex items-center justify-center text-white font-semibold">
                gradient-accent
              </div>
            </div>
          </Demo>

          <Demo label="Glassmorphism">
            <div className="relative h-32 bg-gradient-to-r from-magenta-500 to-azul-500 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass p-6 rounded-lg">
                  <Typography color="text-white" weight="semibold">
                    Glass Effect
                  </Typography>
                </div>
              </div>
            </div>
          </Demo>

          <Demo label="Hover Lift">
            <div className="grid grid-cols-3 gap-4">
              <div className="hover-lift bg-white p-6 rounded-lg border border-cinza-200 cursor-pointer">
                <Typography align="center">Hover Me</Typography>
              </div>
              <div className="hover-lift bg-white p-6 rounded-lg border border-cinza-200 cursor-pointer">
                <Typography align="center">Hover Me</Typography>
              </div>
              <div className="hover-lift bg-white p-6 rounded-lg border border-cinza-200 cursor-pointer">
                <Typography align="center">Hover Me</Typography>
              </div>
            </div>
          </Demo>
        </Section>
      </Container>
    </div>
  );
};

export default ComponentShowcase;
