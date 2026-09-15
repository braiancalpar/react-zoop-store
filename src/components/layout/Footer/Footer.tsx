/**
 * Footer Component
 *
 * Rodapé com links institucionais e copyright.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';
import Typography from '../../common/Typography';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const linkSections = [
    {
      title: 'Institucional',
      links: [
        { label: 'Sobre nós', href: '/sobre' },
        { label: 'Trabalhe conosco', href: '/carreiras' },
        { label: 'Sustentabilidade', href: '/sustentabilidade' },
      ],
    },
    {
      title: 'Ajuda',
      links: [
        { label: 'Atendimento', href: '/atendimento' },
        { label: 'Trocas e devoluções', href: '/trocas' },
        { label: 'Entrega', href: '/entrega' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacidade', href: '/privacidade' },
        { label: 'Termos de uso', href: '/termos' },
        { label: 'Política de cookies', href: '/cookies' },
      ],
    },
  ];

  return (
    <footer className="bg-grafite-900 text-white mt-auto">
      <Container>
        <div className="py-12">
          {/* Logo e descrição */}
          <div className="mb-8">
            <Typography as="div" variant="title" weight="bold" color="text-white" className="mb-2">
              ZOOP
            </Typography>
            <Typography variant="body" color="text-cinza-300">
              Os melhores produtos com os melhores preços.
            </Typography>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {linkSections.map((section) => (
              <div key={section.title}>
                <Typography
                  variant="caption"
                  weight="semibold"
                  color="text-white"
                  className="mb-4 uppercase"
                >
                  {section.title}
                </Typography>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-cinza-300 hover:text-magenta-400 transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-grafite-700">
            <Typography variant="caption" color="text-cinza-400" align="center">
              © {currentYear} Zoop Store. Todos os direitos reservados.
            </Typography>
          </div>
        </div>
      </Container>
    </footer>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(Footer);
