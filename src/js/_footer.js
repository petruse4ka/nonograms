export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const link = document.createElement('a');
  link.className = 'footer__link';
  link.href = 'https://github.com/petruse4ka';
  link.target = '_blank';
  link.textContent = '2025 © Konstantin Petrov';

  footer.appendChild(link);
  document.body.appendChild(footer);
}
