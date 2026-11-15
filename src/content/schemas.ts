import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "headlineAccent": z.string(),
        "headlineSub": z.string(),
        "subheadline": z.string(),
        "ctaPrimary": z.string(),
        "ctaSecondary": z.string(),
        "badges": z.array(z.object({
          "id": z.string(),
          "label": z.string()
        }))
      }),
      "features": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "headlineAccent": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string(),
          "accent": z.string()
        }))
      }),
      "steps": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "headlineAccent": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "number": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "security": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "headlineAccent": z.string(),
        "statusLabel": z.string(),
        "features": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        })),
        "specs": z.array(z.object({
          "id": z.string(),
          "label": z.string(),
          "value": z.string(),
          "accent": z.string()
        })),
        "checklist": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "cta": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "headlineAccent": z.string(),
        "subheadline": z.string(),
        "ctaPrimary": z.string(),
        "ctaSecondary": z.string()
      })
    }),
    signin: z.object({
      "brand": z.string(),
      "headline": z.string(),
      "subheadline": z.string(),
      "emailLabel": z.string(),
      "emailPlaceholder": z.string(),
      "passwordLabel": z.string(),
      "submitButton": z.string(),
      "submittingButton": z.string(),
      "signupPrompt": z.string(),
      "signupLink": z.string(),
      "securityNote": z.string()
    }),
    dashboard: z.object({
      "brand": z.string(),
      "headline": z.string(),
      "subheadline": z.string(),
      "welcomePrefix": z.string(),
      "statusLabel": z.string(),
      "statusNote": z.string(),
      "categories": z.array(z.object({
        "id": z.string(),
        "label": z.string(),
        "description": z.string()
      }))
    }),
    signup: z.object({
      "brand": z.string(),
      "headline": z.string(),
      "subheadline": z.string(),
      "nameLabel": z.string(),
      "namePlaceholder": z.string(),
      "emailLabel": z.string(),
      "emailPlaceholder": z.string(),
      "passwordLabel": z.string(),
      "passwordPlaceholder": z.string(),
      "submitButton": z.string(),
      "submittingButton": z.string(),
      "signinPrompt": z.string(),
      "signinLink": z.string(),
      "securityNote": z.string(),
      "rules": z.object({
        "length": z.string(),
        "upper": z.string(),
        "number": z.string(),
        "special": z.string()
      })
    })
  }
};
export type Schemas = typeof schemas;