// Validation service for forms and data
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: unknown) => string | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

class ValidationService {
  // Common regex patterns
  private patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    username: /^[a-zA-Z0-9_]{3,20}$/,
    phone: /^\+?[\d\s-()]{10,}$/,
    url: /^https?:\/\/.+/,
    slug: /^[a-z0-9-]+$/,
  };

  // Validate a single field
  validateField(value: unknown, rules: ValidationRule, fieldName: string): string | null {
    const stringValue = String(value || '');
    const numericValue = Number(value);

    // Required validation
    if (rules.required && (!value || stringValue.trim() === '')) {
      return `${fieldName} é obrigatório`;
    }

    // Skip other validations if field is empty and not required
    if (!value || stringValue.trim() === '') {
      return null;
    }

    // Length validations
    if (rules.minLength && stringValue.length < rules.minLength) {
      return `${fieldName} deve ter pelo menos ${rules.minLength} caracteres`;
    }

    if (rules.maxLength && stringValue.length > rules.maxLength) {
      return `${fieldName} deve ter no máximo ${rules.maxLength} caracteres`;
    }

    // Numeric validations
    if (rules.min !== undefined && numericValue < rules.min) {
      return `${fieldName} deve ser pelo menos ${rules.min}`;
    }

    if (rules.max !== undefined && numericValue > rules.max) {
      return `${fieldName} deve ser no máximo ${rules.max}`;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(stringValue)) {
      return `${fieldName} tem formato inválido`;
    }

    // Custom validation
    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }

  // Validate an object with multiple fields
  validate(
    data: Record<string, unknown>,
    rules: Record<string, ValidationRule>
  ): ValidationResult {
    const errors: ValidationError[] = [];

    for (const [field, fieldRules] of Object.entries(rules)) {
      const error = this.validateField(data[field], fieldRules, field);
      if (error) {
        errors.push({ field, message: error });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Pre-defined validation sets
  getEmailRules(): ValidationRule {
    return {
      required: true,
      pattern: this.patterns.email,
      maxLength: 255,
    };
  }

  getPasswordRules(): ValidationRule {
    return {
      required: true,
      minLength: 8,
      maxLength: 128,
      pattern: this.patterns.password,
    };
  }

  getUsernameRules(): ValidationRule {
    return {
      required: true,
      pattern: this.patterns.username,
      minLength: 3,
      maxLength: 20,
    };
  }

  getPhoneRules(): ValidationRule {
    return {
      pattern: this.patterns.phone,
    };
  }

  getBetAmountRules(minBet: number = 1, maxBet: number = 10000): ValidationRule {
    return {
      required: true,
      min: minBet,
      max: maxBet,
      custom: (value) => {
        const num = Number(value);
        if (isNaN(num)) {
          return 'Valor deve ser um número';
        }
        if (num <= 0) {
          return 'Valor deve ser maior que zero';
        }
        if (num % 0.01 !== 0) {
          return 'Valor deve ter no máximo 2 casas decimais';
        }
        return null;
      },
    };
  }

  // Specific validators
  isValidEmail(email: string): boolean {
    return this.patterns.email.test(email);
  }

  isValidPassword(password: string): boolean {
    return this.patterns.password.test(password);
  }

  isValidUsername(username: string): boolean {
    return this.patterns.username.test(username);
  }

  isValidUrl(url: string): boolean {
    return this.patterns.url.test(url);
  }

  isValidSlug(slug: string): boolean {
    return this.patterns.slug.test(slug);
  }

  // Password strength checker
  getPasswordStrength(password: string): {
    score: number;
    feedback: string[];
  } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('Use pelo menos 8 caracteres');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Inclua pelo menos uma letra minúscula');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Inclua pelo menos uma letra maiúscula');
    }

    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('Inclua pelo menos um número');
    }

    if (/[@$!%*?&]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Inclua pelo menos um caractere especial (@$!%*?&)');
    }

    if (password.length >= 12) {
      score += 1;
    }

    return { score, feedback };
  }

  // Validate login form
  validateLoginForm(data: { email: string; password: string }): ValidationResult {
    return this.validate(data, {
      email: this.getEmailRules(),
      password: { required: true, minLength: 1 },
    });
  }

  // Validate registration form
  validateRegistrationForm(data: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }): ValidationResult {
    const rules = {
      email: this.getEmailRules(),
      username: this.getUsernameRules(),
      password: this.getPasswordRules(),
      confirmPassword: {
        required: true,
        custom: (value: unknown) => {
          if (value !== data.password) {
            return 'Senhas não coincidem';
          }
          return null;
        },
      },
      acceptTerms: {
        required: true,
        custom: (value: unknown) => {
          if (!value) {
            return 'Você deve aceitar os termos de uso';
          }
          return null;
        },
      },
    };

    return this.validate(data, rules);
  }

  // Validate betting form
  validateBetForm(data: {
    matchId: string;
    teamId: string;
    amount: number;
  }): ValidationResult {
    return this.validate(data, {
      matchId: { required: true },
      teamId: { required: true },
      amount: this.getBetAmountRules(),
    });
  }

  // Validate profile update form
  validateProfileForm(data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }): ValidationResult {
    return this.validate(data, {
      firstName: { maxLength: 50 },
      lastName: { maxLength: 50 },
      phone: this.getPhoneRules(),
    });
  }

  // Real-time validation helper
  debounceValidation = this.debounce((
    value: unknown,
    rules: ValidationRule,
    fieldName: string,
    callback: (error: string | null) => void
  ) => {
    const error = this.validateField(value, rules, fieldName);
    callback(error);
  }, 300);

  // Utility: Debounce function
  private debounce<T extends unknown[]>(
    func: (...args: T) => void,
    wait: number
  ): (...args: T) => void {
    let timeout: NodeJS.Timeout;
    return (...args: T) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Sanitize input data
  sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/\s+/g, ' '); // Normalize whitespace
  }

  // Format currency for validation
  formatCurrency(amount: number, currency: string = 'BRL'): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  // Format percentage
  formatPercentage(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  }
}

export const validationService = new ValidationService();
export default ValidationService;
