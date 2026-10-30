import Founder from '../models/Founder.js';
import { isDBConnected } from '../config/db.js';

/**
 * Seed or verify the two authorized founder accounts
 */
export const seedFounders = async () => {
  if (!isDBConnected()) {
    console.warn('[Founder Provisioning] Database not connected. Skipping founder seed.');
    return;
  }

  try {
    const foundersConfig = [
      {
        name: process.env.FOUNDER_1_NAME || 'Govind Rathod',
        email: (process.env.FOUNDER_1_EMAIL || 'govind@govindwebsolutions.com').toLowerCase().trim(),
        plainPassword: process.env.FOUNDER_1_PASSWORD || 'FounderGovind#2026',
      },
      {
        name: process.env.FOUNDER_2_NAME || 'Co-founder (Business Development)',
        email: (process.env.FOUNDER_2_EMAIL || 'partner@govindwebsolutions.com').toLowerCase().trim(),
        plainPassword: process.env.FOUNDER_2_PASSWORD || 'FounderPartner#2026',
      },
    ];

    for (const config of foundersConfig) {
      const existing = await Founder.findOne({ email: config.email });
      if (!existing) {
        const hashedPassword = await Founder.hashPassword(config.plainPassword);
        await Founder.create({
          name: config.name,
          email: config.email,
          password: hashedPassword,
          role: 'founder',
        });
        console.log(`[Founder Provisioning] Seeded founder account: ${config.email}`);
      }
    }
  } catch (error) {
    console.error('[Founder Provisioning Error] Failed to seed founders:', error.message);
  }
};

export default seedFounders;

