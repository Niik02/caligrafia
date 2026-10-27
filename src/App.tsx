import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  Download,
  Mail,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  FileText,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Instagram,
  ArrowRight,
  Check,
  Lock,
  Zap,
  Printer,
  Heart
} from 'lucide-react';

const CHECKOUT_URL = "https://seguro.editoraebookteca.com.br/checkout/product/byDVGpCG";
const WHATSAPP_URL = "https://wa.me/5599984263075?text=Ol%C3%A1%2C%20tenho%20d%C3%BAvidas%20sobre%20as%20Atividades%20de%20Caligrafia";

// Activity sample sheets from original uploads
const ACTIVITY_SAMPLES = [
  {
    id: 1,
    title: "Junção de Sílabas e Formação de Palavras",
    description: "Exercício com apoio visual lúdico para formar palavras com sílabas cursivas (batata, coruja, bola, coelho).",
    src: "/assets/aistudio/035d5785ba7642a68a95e8fb17849d31ajKZlyi9kWVGjuxh-21_709652e3.png",
  },
  {
    id: 2,
    title: "Criação e Associação de Frases",
    description: "Associação de ilustrações coloridas para estimular criatividade, formação de vocabulário e escrita.",
    src: "/assets/aistudio/035d5785ba7642a68a95e8fb17849d31ajKZlyi9kWVGjuxh-31_f16bce1b.png",
  },
  {
    id: 3,
    title: "Traçado Cursivo Maiúsculo (Letra A)",
    description: "Linhas guias com pontilhados estruturados para memorização do movimento correto das letras maiúsculas.",
    src: "/assets/aistudio/bfd126664c66485d9610364834c90030ncw0SgvZwjKKCTdV-21_1bf6c854.png",
  },
  {
    id: 4,
    title: "Traçado Cursivo Minúsculo (Letra a)",
    description: "Passo a passo com setas direcionais e linhas caligráficas para precisão e uniformidade no tamanho da letra.",
    src: "/assets/aistudio/bfd126664c66485d9610364834c90030ncw0SgvZwjKKCTdV-91_dc1fce89.png",
  },
  {
    id: 5,
    title: "Traçado e Cópia de Frases",
    description: "Treino prático com frases completas, reforçando pontuação, espaçamento e leitura fluida.",
    src: "/assets/aistudio/8d88551811c54338ddd3e7f2dd72c400dy17pK7x5h3SNjfq-31_b2348f00.png",
  },
  {
    id: 6,
    title: "Fixação e Caligrafia de Frases Cotidianas",
    description: "Exercícios contínuos que constroem confiança e agilidade na escrita escolar e pessoal.",
    src: "/assets/aistudio/8d88551811c54338ddd3e7f2dd72c400dy17pK7x5h3SNjfq-211_9a3ae232.png",
  },
];

// Workbooks included in the package
const WORKBOOKS = [
  {
    emoji: "✏️",
    title: "Caderno Prático",
    subtitle: "Caligrafia Prática",
    description: "Atividades para firmar o traçado e escrever com mais ritmo, firmeza e fluidez natural.",
    image: "/assets/aistudio/mock-00058-5_97f18a67.png",
    accent: "from-amber-400 to-orange-500",
  },
  {
    emoji: "🅰️",
    title: "Silabário Cursivo",
    subtitle: "Treino de Sílabas",
    description: "Desenvolve a leitura e escrita com mais segurança, conectando as sílabas com facilidade.",
    image: "/assets/aistudio/mock-00058-4_236de026.png",
    accent: "from-blue-400 to-indigo-500",
  },
  {
    emoji: "🖋️",
    title: "Frases Cursivas",
    subtitle: "Fluidez e Ritmo",
    description: "Melhorar fluidez do traçado e aprimorar a legibilidade da escrita de palavras e orações.",
    image: "/assets/aistudio/mock-00058-1_17997eb2.png",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    emoji: "✍️",
    title: "Produção de Frases",
    subtitle: "Criatividade & Escrita",
    description: "Estimula a imaginação, raciocínio lógico e o vocabulário infantil de forma muito divertida.",
    image: "/assets/aistudio/mock-00058-2_9d3fd22e.png",
    accent: "from-pink-400 to-rose-500",
  },
  {
    emoji: "🎨",
    title: "Coordenação Motora",
    subtitle: "Habilidade Motora Fina",
    description: "Fortalece os músculos das mãos e dedos, essencial para uma pegada correta no lápis e letra bonita.",
    image: "/assets/aistudio/mock-00058-3_e7632d2d.png",
    accent: "from-purple-400 to-fuchsia-500",
  },
];

// FAQs for conversion boost
const FAQS = [
  {
    q: "Como e quando recebo o material?",
    a: "O envio é imediato! Assim que o pagamento for confirmado (no Pix ou Cartão é aprovado em segundos), você recebe em seu e-mail o link para baixar todos os 6 cadernos em PDF de alta resolução.",
  },
  {
    q: "Posso imprimir quantas vezes eu quiser?",
    a: "Sim! Os arquivos são seus para sempre. Você pode imprimir as folhas que a criança tiver mais dificuldade quantas vezes forem necessárias, ou encadernar como apostilas.",
  },
  {
    q: "Para qual idade é indicado?",
    a: "O material é ideal para crianças a partir de 3 e 4 anos (iniciando pela coordenação motora) até 8 a 10 anos que precisam corrigir letra ilegível ou aperfeiçoar a escrita cursiva.",
  },
  {
    q: "O pagamento é mensalidade ou taxa única?",
    a: "É pagamento ÚNICO de apenas R$ 15,00. Sem nenhuma cobrança surpresa ou assinatura.",
  },
  {
    q: "E se eu não gostar?",
    a: "Você conta com nossa Garantia Total de 7 Dias. Se por qualquer motivo achar que não atendeu às suas expectativas, basta nos enviar um e-mail ou WhatsApp que devolvemos 100% do valor pago.",
  },
];

export default function App() {
  // Countdown Timer State (starts at 4h 32m 45s for urgency)
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 32,
    seconds: 45,
  });

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [previewModalImg, setPreviewModalImg] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Sticky bottom bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 45, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Carousel autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ACTIVITY_SAMPLES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Monitor scroll for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToOffer = (e: React.MouseEvent) => {
    e.preventDefault();
    const offerElement = document.getElementById('oferta');
    if (offerElement) {
      offerElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = CHECKOUT_URL;
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ACTIVITY_SAMPLES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ACTIVITY_SAMPLES.length) % ACTIVITY_SAMPLES.length);
  };

  return (
    <div className="min-h-screen bg-white font-poppins text-slate-800 flex flex-col relative overflow-x-hidden">
      {/* Top Notification Bar */}
      <div className="bg-[#201C1E] text-white py-2 px-4 text-xs sm:text-sm text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>
          <strong>Oferta Especial de Lançamento:</strong> 6 Cadernos Completos em PDF por apenas{' '}
          <span className="text-emerald-400 font-bold">R$ 15,00</span>
        </span>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-orange-50/40 to-[#FFF0E5] pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-orange-100/60">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Pill Category Tag */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#5F7590]/30 bg-white shadow-xs text-xs sm:text-sm font-semibold text-[#5F7590] tracking-wider uppercase mb-5">
            <Sparkles className="w-4 h-4 text-[#44CDD9]" />
            <span>ATIVIDADES DE CALIGRAFIA</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#201C1E] tracking-tight leading-tight max-w-3xl mb-6">
            Coleção Completa de{' '}
            <span className="text-[#FF76A2] inline-block relative">
              Caligrafia
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#FF76A2]/30"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </h1>

          {/* Hero Image Bundle Mockup */}
          <div className="w-full max-w-2xl my-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200/40 via-orange-200/30 to-cyan-200/40 rounded-3xl blur-2xl -z-10 transform scale-95" />
            <img
              src="/assets/aistudio/ATIVIDADES-DE-CALIGRAFIA-INFANTL_ec4cdb1b.webp"
              alt="Coleção Completa de Atividades de Caligrafia Infantil"
              className="w-full h-auto drop-shadow-xl rounded-2xl mx-auto transition-transform duration-300 hover:scale-[1.01]"
              loading="eager"
            />
            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-orange-200 shadow-md text-orange-700 px-3 py-1 rounded-full text-xs font-bold mt-2">
              <Printer className="w-3.5 h-3.5 text-orange-500" />
              Pronto para imprimir no conforto de casa
            </div>
          </div>

          {/* Features Check List */}
          <div className="w-full max-w-md my-6 space-y-3">
            {[
              "6 Cadernos de Caligrafia Estruturados",
              "Acesso Imediato por e-mail",
              "3 meses de atualizações e suporte",
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-xs rounded-xl border border-slate-200/80 shadow-xs text-left"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center text-[#44CDD9]">
                  <CheckCircle2 className="w-5 h-5 fill-[#44CDD9] text-white" />
                </div>
                <span className="text-slate-700 font-medium text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>

          {/* Price Box Hero */}
          <div className="flex flex-col items-center justify-center my-3">
            <p className="text-lg sm:text-xl text-slate-500">
              De <del className="text-red-500 font-semibold decoration-2">R$ 47,90</del>
            </p>
            <p className="text-2xl sm:text-3xl text-slate-700 font-medium flex items-baseline gap-2">
              Por{' '}
              <span className="text-4xl sm:text-5xl font-black text-[#1FB826] tracking-tight">
                R$ 15,00
              </span>
            </p>
            <span className="text-xs text-slate-500 mt-1">Pagamento único • Sem mensalidades</span>
          </div>

          {/* Hero CTA Button */}
          <div className="w-full max-w-sm mt-5">
            <a
              href="#oferta"
              onClick={scrollToOffer}
              className="animate-pulse-btn flex items-center justify-center gap-3 w-full py-4 px-8 text-xl sm:text-2xl font-bold text-white rounded-full bg-gradient-to-b from-[#1FB826] to-[#168D1F] hover:from-[#24c72c] hover:to-[#179621] shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
            >
              <span>SIM! EU QUERO</span>
              <ArrowRight className="w-6 h-6" />
            </a>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> Compra Segura
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Envio Instantâneo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Pink Script Ribbon Banner */}
      <section className="bg-[#FF76A2] text-white py-5 px-4 shadow-sm relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-dancing text-2xl sm:text-3xl md:text-4xl font-medium tracking-wide drop-shadow-xs">
            "Uma letra bonita para a vida toda"
          </p>
        </div>
      </section>

      {/* "Modelos de Atividades" Interactive Carousel Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF76A2] bg-pink-50 px-3 py-1 rounded-full">
              Folhas Reais por Dentro
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#201C1E] mt-3 mb-3">
              Modelos de Atividades
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              São <strong className="text-[#FF76A2]">6 cadernos em PDF</strong> com mais de{' '}
              <strong className="text-[#FF76A2]">300 páginas</strong> para aprender e treinar as
              letras cursivas!
            </p>
          </div>

          {/* Carousel Component */}
          <div
            className="relative bg-slate-50 rounded-2xl p-4 sm:p-8 border border-slate-200/80 shadow-md"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="overflow-hidden rounded-xl bg-white border border-slate-100 relative">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {ACTIVITY_SAMPLES.map((slide, idx) => (
                  <div key={slide.id} className="w-full flex-shrink-0 flex flex-col items-center p-2 sm:p-6">
                    <div className="relative group cursor-pointer max-w-md w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={slide.src}
                        alt={slide.title}
                        className="w-full h-auto max-h-[460px] object-contain rounded-xl bg-white"
                        onClick={() => setPreviewModalImg(slide.src)}
                      />
                      <button
                        type="button"
                        onClick={() => setPreviewModalImg(slide.src)}
                        className="absolute bottom-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5 text-xs font-medium transition-all"
                        title="Clique para ampliar folha"
                      >
                        <Maximize2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Ampliar</span>
                      </button>
                    </div>
                    <div className="mt-4 text-center max-w-lg">
                      <span className="text-xs font-semibold text-[#44CDD9] uppercase tracking-wider">
                        Amostra {idx + 1} de {ACTIVITY_SAMPLES.length}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-1">
                        {slide.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Slide anterior"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-slate-200 z-10 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Próximo slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-slate-200 z-10 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 text-slate-700" />
            </button>

            {/* Indicator Dots */}
            <div className="flex justify-center items-center gap-2 mt-5">
              {ACTIVITY_SAMPLES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-[#44CDD9]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>

            <p className="text-center text-xs text-slate-400 mt-3">
              💡 Dica: Toque ou clique na imagem para ampliar e ler cada exercício em alta resolução.
            </p>
          </div>
        </div>
      </section>

      {/* "O que vou Receber?" Header Banner */}
      <section className="bg-[#44CDD9] text-white py-6 px-4 shadow-sm text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          O que vou Receber?
        </h2>
        <p className="text-cyan-50 text-sm sm:text-base mt-1 max-w-xl mx-auto">
          Veja em detalhes os 6 cadernos inclusos no pacote digital
        </p>
      </section>

      {/* "O que vou Receber?" Workbook Cards */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WORKBOOKS.map((book, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex items-center gap-4 sm:gap-5"
              >
                <div className="w-28 sm:w-36 flex-shrink-0 bg-slate-100 rounded-xl p-1 flex items-center justify-center overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-auto object-contain max-h-36 drop-shadow-xs transition-transform hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#44CDD9] block">
                    {book.subtitle}
                  </span>
                  <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-slate-900 leading-snug mt-0.5">
                    {book.emoji} {book.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>
            ))}

            {/* 6th highlight card explaining the complete bundle */}
            <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50 rounded-2xl p-5 border-2 border-dashed border-[#FF76A2] flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF76A2]">
                Bônus Extra Incluso
              </span>
              <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                ⭐ Alfabeto Cursivo Completo
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Todas as 26 letras de A a Z nos formatos maiúsculo e minúsculo, com pontos de partida e flechas direcionais para a criança nunca mais esquecer.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit">
                <Check className="w-4 h-4 text-emerald-600" />
                Incluso no pacote sem custo adicional
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Como Vou Ter Acesso?" Header Banner */}
      <section className="bg-[#44CDD9] text-white py-6 px-4 shadow-sm text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          Como Vou Ter Acesso?
        </h2>
        <p className="text-cyan-50 text-sm sm:text-base mt-1 max-w-xl mx-auto">
          Você vai receber um <strong className="underline decoration-white">material em PDF</strong> para imprimir e usar quando quiser!
        </p>
      </section>

      {/* Access Steps Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="border-2 border-dashed border-[#FF76A2] rounded-2xl p-6 bg-white shadow-xs text-center sm:text-left flex flex-col items-center sm:items-start transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-[#FF76A2] text-white flex items-center justify-center mb-4 shadow-sm">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="font-sora text-lg font-black text-[#201C1E] mb-2">
                Chega no seu e-mail
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Conteúdo digital, formato PDF para impressão. Imediatamente após efetuar o pagamento, você receberá o link de acesso exclusivo via e-mail.
              </p>
            </div>

            {/* Step 2 */}
            <div className="border-2 border-dashed border-[#FF76A2] rounded-2xl p-6 bg-white shadow-xs text-center sm:text-left flex flex-col items-center sm:items-start transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-[#FF76A2] text-white flex items-center justify-center mb-4 shadow-sm">
                <Download className="w-7 h-7" />
              </div>
              <h3 className="font-sora text-lg font-black text-[#201C1E] mb-2">
                Baixe as atividades
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Os arquivos estão organizados por módulos para facilitar a impressão. Baixe e salve no seu computador, tablet ou celular para sempre.
              </p>
            </div>

            {/* Step 3 */}
            <div className="border-2 border-dashed border-[#FF76A2] rounded-2xl p-6 bg-white shadow-xs text-center sm:text-left flex flex-col items-center sm:items-start transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-[#FF76A2] text-white flex items-center justify-center mb-4 shadow-sm">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-sora text-lg font-black text-[#201C1E] mb-2">
                Pratique no seu Tempo
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Depois de baixar, o material é seu. Você pode acessar, estudar e imprimir as folhas que quiser sempre que precisar, sem pressa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Break Callout */}
      <section className="bg-[#FAF9F9] py-14 px-4 text-center border-y border-slate-200/80">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1D2A] leading-tight">
            ACABE AGORA MESMO COM A{' '}
            <span className="text-[#FF76A2]">DIFICULDADE NA ESCRITA</span>!
          </h2>
          <p className="text-slate-600 text-base sm:text-xl mt-3 max-w-2xl mx-auto">
            Um material completo para desenvolver a escrita da criança, da coordenação motora à letra cursiva com leveza e diversão.
          </p>
        </div>
      </section>

      {/* Main Offer Section (Target for CTA buttons, #oferta or #ui) */}
      <section id="oferta" className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          {/* Main Offer Card */}
          <div className="bg-white rounded-3xl border-2 border-slate-300/80 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
            {/* Top Badge */}
            <div className="text-center mb-6">
              <img
                src="/assets/aistudio/ATIVIDADES-DE-CALIGRAFIA-INFANTL_ec4cdb1b.webp"
                alt="Kit Completo de Caligrafia Infantil"
                className="w-full max-w-md mx-auto h-auto rounded-xl drop-shadow-md mb-4"
                loading="lazy"
              />
              <div className="bg-[#F80808] text-white py-2 px-6 rounded-xl font-bold text-lg sm:text-xl tracking-wide uppercase inline-block shadow-md">
                ESTA OFERTA ACABA EM:
              </div>
            </div>

            {/* Live Countdown Timer */}
            <div className="flex justify-center items-center gap-3 sm:gap-4 my-6">
              <div className="bg-white border-2 sm:border-4 border-[#F80808] rounded-xl px-4 py-3 text-center min-w-[75px] sm:min-w-[90px] shadow-xs">
                <span className="block text-3xl sm:text-4xl font-black text-[#F80808] leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#F80808] uppercase tracking-wider">
                  Horas
                </span>
              </div>
              <span className="text-2xl font-bold text-[#F80808]">:</span>
              <div className="bg-white border-2 sm:border-4 border-[#F80808] rounded-xl px-4 py-3 text-center min-w-[75px] sm:min-w-[90px] shadow-xs">
                <span className="block text-3xl sm:text-4xl font-black text-[#F80808] leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#F80808] uppercase tracking-wider">
                  Minutos
                </span>
              </div>
              <span className="text-2xl font-bold text-[#F80808]">:</span>
              <div className="bg-white border-2 sm:border-4 border-[#F80808] rounded-xl px-4 py-3 text-center min-w-[75px] sm:min-w-[90px] shadow-xs">
                <span className="block text-3xl sm:text-4xl font-black text-[#F80808] leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#F80808] uppercase tracking-wider">
                  Segundos
                </span>
              </div>
            </div>

            {/* Offer Content Overview */}
            <div className="text-center my-6">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#201C1E]">
                VEJA O QUE VOCÊ VAI TER ACESSO...
              </h3>
              <div className="inline-block mt-3 px-6 py-1.5 rounded-full border-2 border-blue-600/30 bg-blue-50/50 text-blue-700 font-bold text-sm sm:text-base">
                📄 Material Completo em PDF
              </div>
            </div>

            {/* Bullet points */}
            <div className="space-y-3.5 my-6 max-w-md mx-auto">
              {[
                "6 Cadernos Completos em PDF",
                "+300 Páginas com ilustrações exclusivas",
                "Acesso Imediato por E-MAIL",
                "Atividades prontas no tamanho A4",
                "Garantia Incondicional de 7 Dias",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-700 text-base sm:text-lg">
                  <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#44CDD9] stroke-[3]" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Price section */}
            <div className="text-center pt-4 border-t border-slate-100">
              <p className="text-base sm:text-lg font-semibold text-slate-700">
                TUDO ISSO CUSTARIA <span className="line-through text-red-600 font-bold">R$ 47,90</span>
              </p>
              <p className="text-sm sm:text-base font-medium text-slate-600 uppercase tracking-wide mt-1">
                MAS HOJE VOCÊ VAI INVESTIR APENAS:
              </p>

              {/* Big Circled Price */}
              <div className="my-3 inline-block relative py-2 px-6">
                <span className="text-5xl sm:text-7xl font-black text-[#0EBE32] tracking-tight block">
                  R$ 15,00
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Pagamento único • Acesso vitalício aos PDFs
                </span>
              </div>

              {/* Checkout Button */}
              <div className="mt-4">
                <a
                  href={CHECKOUT_URL}
                  id="botao_pulse"
                  className="animate-pulse-btn flex items-center justify-center gap-3 w-full py-5 px-6 sm:px-10 text-xl sm:text-2xl md:text-3xl font-extrabold text-white rounded-full bg-gradient-to-b from-[#13D139] to-[#00993C] hover:from-[#17e040] hover:to-[#00a641] shadow-xl shadow-green-600/30 transition-all cursor-pointer"
                >
                  <span>COMPRAR AGORA</span>
                  <ArrowRight className="w-7 h-7" />
                </a>
              </div>
            </div>

            {/* Payment Logos & Guarantees */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Formas de Pagamento Seguras
              </p>
              <div className="flex flex-col items-center justify-center gap-3">
                <img
                  src="/assets/aistudio/pagamento.png02_9620dc7c.png"
                  alt="Formas de Pagamento: Visa, Mastercard, Elo, Pix, Boleto, Hipercard"
                  className="max-w-[280px] sm:max-w-[320px] h-auto mx-auto drop-shadow-xs"
                  loading="lazy"
                />
                <img
                  src="/assets/aistudio/garantia-360-slim_819b85df.png"
                  alt="Selo de Garantia de 7 Dias 100% de Satisfação"
                  className="max-w-[240px] sm:max-w-[280px] h-auto mx-auto mt-2"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-4 leading-relaxed">
                🔒 Seus dados estão 100% protegidos com criptografia SSL de 256 bits. O pagamento é processado com total segurança.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#44CDD9] bg-cyan-50 px-3 py-1 rounded-full">
              Tire suas dúvidas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#201C1E] mt-3">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-4 px-5 text-left font-bold text-slate-800 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/60"
                >
                  <span className="text-sm sm:text-base flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#FF76A2] flex-shrink-0" />
                    {faq.q}
                  </span>
                  <span className="text-lg text-slate-400 font-light flex-shrink-0">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer & Contact Section */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Atividades de Caligrafia
                </span>
                <span className="text-xs bg-[#FF76A2] text-white px-2 py-0.5 rounded font-bold">
                  PDF
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                Material pedagógico infantil focado no desenvolvimento motor, traçado fluído e caligrafia bonita para crianças em fase de alfabetização.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garantia de 7 dias ou seu dinheiro de volta.</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Canais de Atendimento
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span>WhatsApp: (99) 984263075</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contato@atividadescursiva.com.br"
                    className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>contato@atividadescursiva.com.br</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/atividadescursiva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-slate-300 hover:text-pink-400 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <span>@atividadescursiva</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Atividades de Caligrafia Infantil. Todos os direitos reservados.</p>
            <p className="flex items-center justify-center gap-1">
              Feito com <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para pais e educadores
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (WhatsApp) */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center z-40 hover:scale-110 active:scale-95 transition-transform"
        title="Dúvidas? Fale conosco no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>

      {/* Sticky Bottom Bar for Mobile conversion */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-4 z-30 shadow-2xl flex items-center justify-between gap-3 sm:hidden">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-medium">De R$ 47,90 por:</span>
            <span className="text-xl font-black text-[#1FB826] leading-none">R$ 15,00</span>
          </div>
          <a
            href={CHECKOUT_URL}
            className="flex-1 max-w-[220px] bg-gradient-to-r from-[#13D139] to-[#00993C] text-white py-3 px-4 rounded-full font-bold text-sm text-center shadow-md flex items-center justify-center gap-1.5"
          >
            <span>QUERO APROVEITAR</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Lightbox / Zoom Modal for Activity Sheet Inspection */}
      {previewModalImg && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6"
          onClick={() => setPreviewModalImg(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 relative shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewModalImg(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Fechar pré-visualização"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full flex items-center justify-between border-b border-slate-100 pb-2 mb-3 pr-10">
              <span className="text-xs font-bold text-[#FF76A2] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Amostra em Alta Resolução
              </span>
            </div>
            <img
              src={previewModalImg}
              alt="Amostra da Atividade"
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg border border-slate-100"
            />
            <div className="mt-4 w-full flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-500 text-center sm:text-left">
                Folha no tamanho padrão A4 pronta para impressão nítida e limpa.
              </p>
              <a
                href={CHECKOUT_URL}
                className="w-full sm:w-auto bg-[#1FB826] hover:bg-[#168D1F] text-white text-xs sm:text-sm font-bold py-2.5 px-6 rounded-full shadow-sm text-center transition-colors"
              >
                Garantir Cadernos por R$ 15,00
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
