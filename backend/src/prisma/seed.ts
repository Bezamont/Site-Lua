import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// ============================================================
// Seed — Popula o banco com dados iniciais
// ============================================================

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // ─── Admin ────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@luaink.com' },
    update: {},
    create: {
      name: 'Luna (Admin)',
      email: 'admin@luaink.com',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log(`✅ Admin criado: ${admin.email}`);

  // ─── Categorias ───────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'flores' },
      update: {},
      create: { name: 'Flores', slug: 'flores', description: 'Botânicos e florais' },
    }),
    prisma.category.upsert({
      where: { slug: 'geometrico' },
      update: {},
      create: { name: 'Geométrico', slug: 'geometrico', description: 'Formas e linhas geométricas' },
    }),
    prisma.category.upsert({
      where: { slug: 'animais' },
      update: {},
      create: { name: 'Animais', slug: 'animais', description: 'Fauna diversa' },
    }),
  ]);
  console.log(`✅ ${categories.length} categorias criadas`);

  // ─── Produtos de exemplo ──────────────────────────────────
  const products = await Promise.all([
    prisma.product.upsert({
      where: { id: 'seed-flash-01' },
      update: {},
      create: {
        id: 'seed-flash-01',
        name: 'Rosa Fine Line',
        description: 'Rosa delicada em traço fino, perfeita para pulso ou tornozelo.',
        type: 'flash',
        status: 'available',
        price: 25000, // R$ 250,00
        imageUrls: '[]',
        tags: '["floral","fine line","delicado"]',
        size: '5x5 cm',
        estimatedTime: 90,
        categoryId: categories[0].id,
      },
    }),
    prisma.product.upsert({
      where: { id: 'seed-flash-02' },
      update: {},
      create: {
        id: 'seed-flash-02',
        name: 'Lua e Estrelas',
        description: 'Composição minimalista de lua crescente com estrelas.',
        type: 'flash',
        status: 'available',
        price: 18000, // R$ 180,00
        imageUrls: '[]',
        tags: '["celestial","minimalista","lua"]',
        size: '4x4 cm',
        estimatedTime: 60,
        categoryId: categories[1].id,
      },
    }),
    prisma.product.upsert({
      where: { id: 'seed-hourly-01' },
      update: {},
      create: {
        id: 'seed-hourly-01',
        name: 'Sessão por Hora',
        description: 'Sessão personalizada cobrada por hora de trabalho. Ideal para projetos maiores.',
        type: 'hourly',
        status: 'available',
        price: 20000, // R$ 200,00/h
        imageUrls: '[]',
        tags: '["personalizado","sob consulta"]',
      },
    }),
  ]);
  console.log(`✅ ${products.length} produtos criados`);

  console.log('\n🌙 Seed finalizado com sucesso!\n');
  console.log('Credenciais do admin:');
  console.log('  Email: admin@luaink.com');
  console.log('  Senha: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

