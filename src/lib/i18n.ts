export type Lang = "pt";

export const translations = {
  siteTitle: "Centelhas Divinas",
  bookSubtitle: "Livro 1: O Reator Humano",
  chapters: "Capítulos",
  prev: "← Anterior",
  next: "Próximo →",
  scrollToRead: "Scroll para ler",
  byAuthor: "Por Bruno Rosa",
  emailCaptureTitle: "Receba a história por e-mail",
  emailCaptureDescription: "Novos capítulos publicados semanalmente. Deixe seu e-mail para receber.",
  emailCaptureButton: "Inscrever",
  emailSuccess: "Obrigado! Você receberá os capítulos por e-mail.",
  namePlaceholder: "Seu nome",
  emailPlaceholder: "Seu e-mail",
  registering: "Cadastrando…",
  emailError: "Não foi possível cadastrar. Tente novamente.",
  privacyNote:
    "Ao informar seu e-mail, você concorda em receber novidades sobre Centelhas Divinas. Respeitamos sua privacidade.",
  openMenu: "Abrir menu",
  chapterTitles: {
    1: "A Oração Antes do Salto",
    2: "Sob a Selva",
    3: "A Caverna",
  },
  chapterNum: (n: number) => `Capítulo ${n}`,
} as const;
