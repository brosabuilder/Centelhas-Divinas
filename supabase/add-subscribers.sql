-- Adiciona 3 assinantes manualmente
-- Execute no SQL Editor do Supabase: https://supabase.com/dashboard → seu projeto → SQL Editor

INSERT INTO subscribers (name, email)
VALUES
  ('Gabriel Correia', 'gabrielmonaga@gmail.com'),
  ('Jonathas Arruda', 'jonathasarruda@outlook.com'),
  ('Guilherme Freitas', 'guilherme.cordovil.freitas@gmail.com'),
  ('Bruno Rosa', 'oi.brunorosa@gmail.com')
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;
