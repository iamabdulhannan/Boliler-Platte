import { describe, expect, it } from 'vitest';
import { cn, getInitials, truncate, formatCurrency } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges class names', () => {
      expect(cn('p-2', 'p-4')).toBe('p-4');
    });
    it('handles conditional classes', () => {
      const isHidden = false;
      expect(cn('base', isHidden && 'hidden', 'visible')).toBe('base visible');
    });
  });

  describe('getInitials', () => {
    it('returns two-letter initials', () => {
      expect(getInitials('Abdul Hannan')).toBe('AH');
    });
    it('handles single name', () => {
      expect(getInitials('Hannan')).toBe('H');
    });
  });

  describe('truncate', () => {
    it('truncates strings exceeding max length', () => {
      expect(truncate('Hello world', 5)).toBe('Hello…');
    });
    it('leaves short strings untouched', () => {
      expect(truncate('Hi', 5)).toBe('Hi');
    });
  });

  describe('formatCurrency', () => {
    it('formats USD currency', () => {
      expect(formatCurrency(1234.5)).toBe('$1,234.50');
    });
  });
});
