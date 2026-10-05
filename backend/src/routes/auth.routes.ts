import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authMiddleware } from '../middleware/auth.middleware';

// ============================================================
// Auth Routes — /auth
// ============================================================

const router = Router();

// ─── Schemas de validação ────────────────────────────────────
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  cpf: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// ─── Helper: gera token JWT ───────────────────────────────────
function generateToken(userId: string, role: string): string {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({ userId, role }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as jwt.SignOptions);
}

// ─── POST /auth/register ─────────────────────────────────────
router.post('/register', async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Dados inválidos.', details: result.error.flatten() });
    return;
  }

  const { name, email, password, phone, cpf } = result.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409).json({ error: 'E-mail já cadastrado.' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, phone, cpf },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true, updatedAt: true },
  });

  const accessToken = generateToken(user.id, user.role);

  res.status(201).json({
    user,
    tokens: { accessToken },
  });
});

// ─── POST /auth/login ─────────────────────────────────────────
router.post('/login', async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Dados inválidos.' });
    return;
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    return;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    return;
  }

  const accessToken = generateToken(user.id, user.role);

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    user: userWithoutPassword,
    tokens: { accessToken },
  });
});

// ─── GET /auth/me ─────────────────────────────────────────────
router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    select: { id: true, name: true, email: true, phone: true, cpf: true, role: true, createdAt: true, updatedAt: true },
  });

  if (!user) {
    res.status(404).json({ error: 'Usuário não encontrado.' });
    return;
  }

  res.json(user);
});

export default router;

