// Typography System for Leave Management System
export const typography = {
  // Font families
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  },

  // Font sizes
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },

  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },

  // Line heights
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625'
  },

  // Predefined styles
  styles: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: '800',
      lineHeight: '1.25',
      marginBottom: '1rem'
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: '700',
      lineHeight: '1.25',
      marginBottom: '0.75rem'
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: '600',
      lineHeight: '1.375',
      marginBottom: '0.75rem'
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: '600',
      lineHeight: '1.375',
      marginBottom: '0.5rem'
    },
    body: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.625'
    },
    bodyLarge: {
      fontSize: '1.125rem',
      fontWeight: '400',
      lineHeight: '1.625'
    },
    caption: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.5'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.5'
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: '600',
      lineHeight: '1.25'
    }
  }
};

export const textColors = {
  primary: '#1f2937',
  secondary: '#6b7280',
  accent: '#22c55e',
  error: '#ef4444',
  success: '#10b981'
};