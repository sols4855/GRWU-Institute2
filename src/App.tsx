/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Settings, Plus, Trash2, Edit2, 
  ChevronRight, BookOpen, Users, Award, Phone, MapPin, Mail,
  Save, Palette, Type, Image as ImageIcon, Layout, Leaf, Bell, Calendar, Lock
} from 'lucide-react';

// --- Types ---
interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface FacilityImage {
  id: string;
  src: string;
  name: string;
}

interface SiteConfig {
  version: number;
  primaryColor: string;
  fontFamily: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBgImage: string;
  aboutText: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  notices: Notice[];
  facilityImages: FacilityImage[];
  adminPassword?: string;
}

const INITIAL_CONFIG: SiteConfig = {
  version: 5,
  primaryColor: '#22c55e',
  fontFamily: 'Inter',
  heroTitle: '우리 아이의 언어능력, 인지능력, 학습능력을 향상하는\n푸른숲 언어인지학습연구소입니다.',
  heroSubtitle: '',
  heroBgImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000',
  aboutText: '"숲은 인간의 심장이다"라는 말이 있습니다. 숲은 우리 인간에게 생명력과 에너지를 공급하는 가장 큰 산소 생산자이기 때문입니다. 인간에게 있어서 언어능력 역시 삶을 살아가는 가장 기본적인 필수 요건입니다. 이러한 어려움을 같이 나누고 향상시켜 숲과 같은 산소공급자의 역할을 하고자 하는 마음으로 함께 나아갈 푸른숲 언어인지학습연구소 입니다.',
  contactPhone: '031-509-8922',
  contactEmail: 'grwu8922@naver.com',
  contactAddress: '경기 시흥시 장현능곡로 155, 시흥 플랑드르 3층 3011호',
  notices: [
    { id: '1', title: '푸른숲 언어인지학습연구소 홈페이지 오픈', content: '안녕하세요. 푸른숲 언어인지학습연구소입니다. 우리 아이들의 성장을 돕기 위한 새로운 소통 공간이 마련되었습니다.', date: '2026-03-19' }
  ],
  facilityImages: [
    { id: '1', src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', name: '학부모 대기실' },
    { id: '2', src: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800', name: '학부모 대기실' },
    { id: '3', src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800', name: '한마음(상담실)' },
    { id: '4', src: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&q=80&w=800', name: '한마음(상담실)' },
    { id: '5', src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800', name: '둘이랑(개별지도실)' },
    { id: '6', src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800', name: '도란도란(소그룹실)' },
    { id: '7', src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800', name: '도란도란(소그룹실)' },
    { id: '8', src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800', name: '어울림(대그룹실)' },
    { id: '9', src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800', name: '어울림(대그룹실)' },
    { id: '10', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', name: '어울림(대그룹실)' },
  ],
  adminPassword: 'admin'
};

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('site-config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // Force reset if version is old or missing
        if (!parsed.version || parsed.version < INITIAL_CONFIG.version) {
          return INITIAL_CONFIG;
        }
        
        // Migration: Ensure absolute paths
        if (parsed.heroBgImage === 'hero_bg.jpg') {
          parsed.heroBgImage = '/hero_bg.jpg';
        }
        
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved config', e);
      }
    }
    return INITIAL_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('site-config', JSON.stringify(config));
  }, [config]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'services' | 'notices'>('home');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowPasswordPrompt(true);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === (config.adminPassword || 'admin')) {
      setIsAdmin(true);
      setShowPasswordPrompt(false);
      setPasswordInput('');
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  // Apply config changes to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', config.primaryColor);
    document.documentElement.style.setProperty('--font-sans', config.fontFamily);
  }, [config]);

  // --- File Upload Utility ---
  const handleFileUpload = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  // --- Admin Handlers ---
  const handleUpdateConfig = (updates: Partial<SiteConfig>) => {
    setConfig({ ...config, ...updates });
  };

  // --- Navigation Handlers ---
  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveTab('home');
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Account for fixed header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setActiveTab(id as any);
      }
    }
  };

  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  const programs = [
    { 
      title: '사회성 그룹 프로그램', 
      target: '7세 ~ 초등3학년', 
      desc: '미술치료와 요리치료를 접목하여 또래와 협력하며 긍정적인 사회적 경험을 쌓는 프로그램입니다.',
      details: {
        intro: '미술치료와 요리치료를 접목하여 또래와 협력하며 긍정적인 사회적 경험을 쌓는 프로그램입니다.',
        learning: [
          { subtitle: '사회적 기술', content: '나누기, 감정 조절, 사회적 지식과 맥락 이해하기를 배웁니다.' },
          { subtitle: '협력 중심 활동', content: '협력하기, 양보하기, 의견 모으기 등을 실전 게임과 활동을 통해 연습합니다.' },
          { subtitle: '자기 조절', content: '미술·요리 활동 중 힘을 조절하고 인내하며 집중력을 지속시키는 힘을 키웁니다.' }
        ],
        recommended: [
          '또래 갈등이 많거나 타인 공감이 어려운 아동',
          '자존감이 낮아 위축된 아동',
          '규범 지키기가 힘든 아동'
        ],
        schedule: '매주 목요일 (예정) / 90분 수업 (요리심리상담사 및 미술치료사 공동 진행)\n*요일 변경 가능'
      }
    },
    { 
      title: '미술치료 프로그램', 
      target: '전 연령', 
      desc: '예술적 매체를 통해 내면의 불안과 스트레스를 해소하고 정서적 성장을 돕는 심리치료입니다.',
      details: {
        intro: '그림, 조형, 색채 등 예술적 매체로 내면의 불안과 스트레스를 해소하는 심리치료입니다.\n아이의 자아 효능감을 높이고 정서적 성장을 돕습니다.',
        learning: [
          { subtitle: '정서 안정', content: '내재된 우울이나 스트레스를 해소하고 이를 극복할 수 있는 내면의 힘을 키워줍니다.' },
          { subtitle: '자아 성장', content: '말로 하기 힘든 감정을 미술로 표현하며 정서적 안정을 찾습니다.' },
          { subtitle: '신체 및 감각', content: '자르고, 붙이고, 접는 동작을 통해 소근육 발달과 감각통합을 돕습니다.' },
          { subtitle: '사회성 향상', content: '자신감을 회복하여 학교 등 일상생활에서의 부적응 행동을 개선합니다.' }
        ],
        recommended: [
          '정서적 어려움(스트레스, 불안, 우울감 등)을 경험하는 아동',
          '정서표현이 제한적이거나 감정 조절에 어려움을 보이는 아동',
          '불안, 위축, 분노, 충동성 등 적응의 어려움을 경험하는 아동',
          '또래 관계나 학교생활 적응에 어려움을 겪는 아동',
          '언어중심 상담보다는 비언어적, 경험적 접근이 적합한 아동'
        ],
        schedule: '개별 50분 또는 짝/소그룹 60분 수업 (전문 미술치료사 진행)'
      }
    },
    { 
      title: '요리치료 프로그램', 
      target: '영유아 ~ 아동', 
      desc: '흥미로운 요리 활동을 통해 정서적 안정과 감각, 인지 발달 및 사회성 향상을 돕는 치료입니다.',
      details: {
        intro: '요리라는 흥미로운 매체를 통해 심리·정서적 어려움이나 감각, 인지 영역의 발달과 자아효능감을 올려 사회성 향상을 돕는 치료입니다.',
        learning: [
          { subtitle: '인지 및 오감 자극', content: '식재료를 직접 다루며 오감 자극을 통해 감각의 조절과 실제적인 경험을 통해 인지 능력을 증진시킵니다.' },
          { subtitle: '신체 발달', content: '썰기, 다지기, 휘젓기 등의 동작으로 소근육과 감각통합 능력을 기릅니다.' },
          { subtitle: '정서 및 관계', content: '요리 활동 과정을 통해 정서적 안정과 자신감의 회복을 도와 또래와의 관계회복에 도움을 줍니다.' }
        ],
        recommended: [
          '정서·심리적 어려움이 있는 아동',
          '소근육 및 사회성 향상이 필요한 아동',
          '자존감이 낮은 아동'
        ],
        schedule: '개별 50분 또는 짝/그룹 60분 수업 (요리심리상담사 & 언어재활사 진행)'
      }
    },
    { 
      title: '학습치료 프로그램', 
      target: '아동 ~ 청소년', 
      desc: 'ADHD 및 경계선 지능 아동을 위한 체계적인 집중 전략과 맞춤형 학습 전략 프로그램입니다.',
      details: {
        intro: 'ADHD 진단을 받았거나 경계선 지능이 의심되는 아동을 위해 단순 반복이 아닌 체계적인 \'집중 전략과 학습전략\'을 가르치는 프로그램입니다.\n행동문제 중재와 함께 학습능력을 올리기 위한 맞춤식 학습전략을 습득하여 스스로 학습을 수행하도록 돕습니다.',
        learning: [
          { subtitle: '주의집중력의 중요성', content: '청각적 주의집중력(경청 및 이해)과 선택적 주의집중력(필요 정보 집중)은 사회성과 교과 수업의 핵심입니다.' },
          { subtitle: '체계적인 4단계 구성', content: '1단계(주의집중력) → 2단계(행동 억제 및 집행력) → 3단계(작업기억 및 기억력) → 4단계(언어적·수학적 사고력) 완성' }
        ],
        recommended: [
          'ADHD 진단 또는 성향이 있는 아동',
          '산만하고 자기 조절이 힘든 아동',
          '학습 능력이 저하된 아동'
        ],
        schedule: '주 1회 50분 수업 (학습치료사 & 언어재활사 진행)'
      }
    },
    { 
      title: '인지치료 프로그램', 
      target: '아동', 
      desc: '기초 인지 개념을 확립하여 언어 능력과 학습 능력의 뿌리를 만드는 과정입니다.',
      details: {
        intro: '기초 인지 개념을 확립하여 언어 능력과 학습 능력의 뿌리를 만드는 과정입니다.',
        learning: [
          { subtitle: '언어 발달', content: '언어 이해력을 높여 전반적인 의사소통 능력을 향상시킵니다.' },
          { subtitle: '기초 학습', content: '읽기, 쓰기의 기초가 되는 시지각과 소근육 발달을 돕습니다.' },
          { subtitle: '사회성', content: '상황을 올바르게 인지하고 공감하는 \'화용 언어\'의 밑거름이 됩니다.' }
        ],
        recommended: [
          '기초 인지 개념 습득이 필요한 아동',
          '시지각 발달이 더딘 아동',
          '학습의 기초를 다지고 싶은 아동'
        ],
        schedule: '개별 맞춤형 수업 진행'
      }
    },
    { 
      title: '언어치료 프로그램', 
      target: '전 연령', 
      desc: '풍부한 임상 경험을 바탕으로 아이의 언어 발달 지연이나 조음(발음) 문제를 해결하는 전문 치료입니다.',
      details: {
        intro: '풍부한 임상 경험을 바탕으로 아이의 언어 발달 지연이나 조음(발음) 문제를 해결하는 전문 치료입니다.',
        learning: [
          { subtitle: '조음 치료', content: '반복적인 조음 기관 움직임 훈련을 통해 정확한 발음을 형성합니다.' },
          { subtitle: '언어 이해 및 표현', content: '인지 개념과 연동하여 상황에 맞는 적절한 단어와 문장을 구사하도록 돕습니다.' },
          { subtitle: '장기 기억 강화', content: '배운 내용을 잊지 않도록 체계적인 반복 학습을 진행합니다.' }
        ],
        recommended: [
          '발음이 부정확한 아동',
          '또래보다 언어 발달이 늦은 아동',
          '상황에 맞는 대화가 어려운 아동'
        ],
        schedule: '개별 50분 또는 짝/소그룹 60분 수업 (1급 언어재활사 진행)'
      }
    },
  ];

  return (
    <div className="min-h-screen selection:bg-accent/30 relative" id="home">
      {/* Background Decorations */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 text-accent/10"
        >
          <Leaf size={200} strokeWidth={0.5} />
        </motion.div>
        <motion.div 
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-48 text-accent/5"
        >
          <Leaf size={250} strokeWidth={0.3} />
        </motion.div>
        <motion.div 
          animate={{ 
            x: [0, 25, 0],
            rotate: [0, 20, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-48 left-1/4 text-accent/8"
        >
          <Leaf size={220} strokeWidth={0.4} />
        </motion.div>
        
        {/* Subtle Forest Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none">
          <img 
            src="/hero_bg.jpg" 
            alt="Forest Texture" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Program Detail Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProgram(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
                <button 
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-slate-900">{selectedProgram.title}</h2>

                  {selectedProgram.details ? (
                    <>
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                          <div className="w-1.5 h-6 bg-accent rounded-full" />
                          프로그램 소개
                        </h4>
                        <p className="text-text-secondary leading-relaxed">{selectedProgram.details.intro}</p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                          <div className="w-1.5 h-6 bg-accent rounded-full" />
                          핵심 학습 내용
                        </h4>
                        <div className="grid gap-4">
                          {selectedProgram.details.learning.map((item: any, idx: number) => (
                            <div key={idx} className="bg-accent/5 p-4 rounded-xl border border-accent/10">
                              <p className="font-bold text-accent text-sm mb-1">{item.subtitle}</p>
                              <p className="text-text-secondary text-sm">{item.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                          <div className="w-1.5 h-6 bg-accent rounded-full" />
                          추천 대상
                        </h4>
                        <ul className="grid gap-2">
                          {selectedProgram.details.recommended.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-3 text-text-secondary text-sm">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-900 mb-2">운영 안내</h4>
                        <p className="text-sm text-text-secondary whitespace-pre-line leading-relaxed">
                          {selectedProgram.details.schedule}
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="text-text-secondary leading-relaxed">{selectedProgram.desc}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Password Prompt Modal */}
      <AnimatePresence>
        {showPasswordPrompt && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowPasswordPrompt(false);
                setPasswordInput('');
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="text-accent" size={24} />
                </div>
                <h2 className="text-2xl font-bold">관리자 인증</h2>
                <p className="text-text-secondary text-sm">설정 변경을 위해 비밀번호를 입력해주세요.</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <input
                  type="password"
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="w-full bg-black/5 border border-black/10 rounded-xl p-4 text-center text-lg focus:border-accent outline-none"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordPrompt(false);
                      setPasswordInput('');
                    }}
                    className="flex-1 py-4 rounded-xl font-bold bg-black/5 hover:bg-black/10 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-xl font-bold bg-accent text-white hover:opacity-90 transition-opacity"
                  >
                    확인
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-black/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Layout className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter">푸른숲<span className="text-accent">언어인지학습연구소</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['home', 'about', 'services', 'notices'].map((tab) => (
              <button
                key={tab}
                onClick={() => scrollToSection(tab)}
                className={`text-sm uppercase tracking-widest transition-colors hover:text-accent ${activeTab === tab ? 'text-accent' : 'text-text-secondary'}`}
              >
                {tab === 'home' ? '홈' : tab === 'about' ? '연구소 소개' : tab === 'services' ? '프로그램' : '공지사항'}
              </button>
            ))}
            <button 
              onClick={handleAdminToggle}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
              title="관리자 모드"
            >
              <Settings className={`w-5 h-5 ${isAdmin ? 'text-accent animate-spin-slow' : 'text-text-secondary'}`} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={handleAdminToggle} className="p-2">
              <Settings className={`w-5 h-5 ${isAdmin ? 'text-accent' : 'text-text-secondary'}`} />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg-primary pt-24 px-6 flex flex-col gap-6"
          >
            {['home', 'about', 'services', 'notices'].map((tab) => (
              <button
                key={tab}
                onClick={() => { scrollToSection(tab); setIsMenuOpen(false); }}
                className={`text-2xl font-light text-left border-b border-white/5 pb-4 ${activeTab === tab ? 'text-accent' : 'text-text-secondary'}`}
              >
                {tab === 'home' ? '홈' : tab === 'about' ? '연구소 소개' : tab === 'services' ? '프로그램' : '공지사항'}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-20">
        {isAdmin ? (
          <AdminDashboard 
            config={config} 
            onUpdateConfig={handleUpdateConfig}
            onFileUpload={handleFileUpload}
          />
        ) : (
          <UserPage 
            config={config} 
            activeTab={activeTab} 
            programs={programs}
            setSelectedProgram={setSelectedProgram}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-bg-secondary border-t border-black/5 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
                <Layout className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-bold">푸른숲언어인지학습연구소</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              아이들의 밝은 미래를 위해 정성을 다하는<br />언어 및 인지 발달 전문 파트너입니다.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm uppercase tracking-widest font-semibold text-accent">Contact</h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li className="flex items-start gap-3"><Phone size={16} className="mt-1" /> {config.contactPhone}</li>
              <li className="flex items-start gap-3"><Mail size={16} className="mt-1" /> {config.contactEmail}</li>
              <li className="flex items-start gap-3"><MapPin size={16} className="mt-1" /> {config.contactAddress}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-black/5 text-center text-xs text-text-secondary">
          © 2026 푸른숲언어인지학습연구소. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

// --- User Page Component ---
function UserPage({ config, activeTab, programs, setSelectedProgram }: { 
  config: SiteConfig, 
  activeTab: string,
  programs: any[],
  setSelectedProgram: (program: any) => void
}) {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={config.heroBgImage} 
            alt="Center Interior" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl space-y-6"
        >
          <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight whitespace-pre-line text-slate-900 drop-shadow-sm">
            {config.heroTitle}
          </h1>
          {config.heroSubtitle && (
            <p className="text-xl md:text-2xl text-slate-700 whitespace-pre-line leading-relaxed max-w-2xl">
              {config.heroSubtitle}
            </p>
          )}
          <div className="flex gap-4">
            <a 
              href="http://pf.kakao.com/_xbuxixcn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-accent text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-accent/20"
            >
              상담 예약하기 <ChevronRight size={20} />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 rounded-[3rem] shadow-xl border border-black/5 relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <Leaf className="absolute left-4 top-10 text-accent/10 rotate-45 opacity-30" size={120} strokeWidth={0.5} />
          <Leaf className="absolute right-4 bottom-10 text-accent/10 -rotate-12 opacity-30" size={100} strokeWidth={0.5} />
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            <div className="inline-block px-4 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest">
              Director Profile
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-slate-900">전문성과 따뜻한 마음으로<br />아이들과 함께합니다.</h2>
              <div className="flex flex-col items-center">
                <p className="text-accent font-bold text-2xl">대표 치료사 공영아</p>
                <p className="text-sm text-text-secondary">언어재활사 / 특수교사</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-left w-full max-w-2xl mx-auto pt-8 border-t border-black/5">
              <ul className="text-text-secondary space-y-3 text-sm">
                <li className="flex items-start gap-2"><span className="text-accent">•</span> 특수교육학 학사</li>
                <li className="flex items-start gap-2"><span className="text-accent">•</span> 강남대대학원 언어치료교육학 석사</li>
                <li className="flex items-start gap-2"><span className="text-accent">•</span> 언어재활사 1급</li>
                <li className="flex items-start gap-2"><span className="text-accent">•</span> 인지학습치료사</li>
              </ul>
              <ul className="text-text-secondary space-y-3 text-sm">
                <li className="flex items-start gap-2"><span className="text-accent">•</span> 요리 심리상담사 1급</li>
                <li className="flex items-start gap-2"><span className="text-accent">•</span> 학습인지교육상담전문가 2급</li>
                <li className="flex items-start gap-2"><span className="text-accent">•</span> 학습 및 진로상담전문가</li>
                <li className="flex items-start gap-2"><span className="text-accent">•</span> 전) 우리아이들병원 언어인지정서발달연구소 팀장</li>
              </ul>
            </div>

            <p className="text-text-secondary leading-relaxed text-md pt-8 max-w-2xl italic">
              "{config.aboutText}"
            </p>
          </div>
        </motion.div>

        {/* Facility Gallery Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 space-y-8"
        >
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">시설 안내</h3>
            <p className="text-text-secondary text-sm">아이들이 편안하게 학습할 수 있는 쾌적한 환경을 제공합니다.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {config.facilityImages.map((item) => (
              <div key={item.id} className="group relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-md border border-black/5 bg-slate-50">
                <img 
                  src={item.src} 
                  alt={item.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-6">
                  <p className="text-white font-medium text-sm md:text-base">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Philosophy & Process Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass-card p-10 rounded-3xl space-y-8">
          <h3 className="text-2xl font-bold border-l-4 border-accent pl-4">우리 기관의 교육철학</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-bold text-lg">모든 사람에게는 가지고 있는 강점이 있다.</h4>
              <p className="text-sm text-text-secondary">우리 아이들 또한 저마다 가지고 있는 강점을 개발하여 자아효능감과 자아존중감을 키워줄 수 있다.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg">흔들리지 않는 꽃은 없다.</h4>
              <p className="text-sm text-text-secondary">세상 어느 아름다운 꽃도 바람에 흔들리지 않는 꽃은 없듯이 그 흔들림을 아름답게 승화할 수 있는 기회를 제공해 준다.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg">함께 나아가는 행복 자람터</h4>
              <p className="text-sm text-text-secondary">함께 나아가는 마음으로 그에 맞는 학습전략과 언어인지 능력을 향상하여 행복이자라는 아이의 행복 자람터가 된다.</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-10 rounded-3xl space-y-8">
          <h3 className="text-2xl font-bold border-l-4 border-accent pl-4">치료 진행 절차</h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              { step: '1', title: '초기상담' },
              { step: '2', title: '언어학습능력검사' },
              { step: '3', title: '결과상담' },
              { step: '4', title: '수업 목표 설정' },
              { step: '5', title: '치료 및 프로그램 시작' }
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4 bg-accent/5 p-4 rounded-2xl border border-accent/10">
                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">{item.step}</span>
                <span className="font-bold">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-bg-secondary py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=2000" 
            alt="Forest Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">프로그램 안내</h2>
            <p className="text-text-secondary">아이들의 발달 단계와 필요에 맞춘 전문 프로그램을 운영합니다.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProgram(item)}
                className="glass-card p-8 rounded-3xl space-y-6 hover:border-accent/50 transition-colors group shadow-sm cursor-pointer"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">{item.desc}</p>
                <div className="pt-4 flex items-center text-accent text-xs font-bold gap-1 group-hover:translate-x-1 transition-transform">
                  자세히 보기 <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Items Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Leaf size={200} strokeWidth={0.2} className="text-accent" />
        </div>
        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-4xl font-bold">발달 및 언어검사 안내</h2>
          <p className="text-text-secondary">정확한 진단을 위해 다양한 전문 검사 도구를 사용합니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: '언어검사', items: ['PRES(언어이해, 표현)', 'REVT(어휘력)', 'UTEP2(조음)', '구문의미이해력 검사', '언어문제해결력검사', '메타화용언어검사', 'LSSC(학령기 아동 언어검사)'] },
            { title: '발달검사', items: ['K-CDI 영유아 발달검사', '학습장애선별검사', '인지,언어이해력 검사'] },
            { title: '지능검사', items: ['K-WISC-5 (웩슬러검사)'] },
            { title: '학습유형검사', items: ['U&I 학습유형검사'] }
          ].map((group, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl space-y-4">
              <h4 className="font-bold text-accent border-b border-accent/20 pb-2">{group.title}</h4>
              <ul className="text-xs text-text-secondary space-y-2">
                {group.items.map((item, j) => (
                  <li key={j}>✓ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Notices Section */}
      <section id="notices" className="max-w-7xl mx-auto px-6 py-24 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Bell className="text-accent" /> 공지사항
          </h2>
          <p className="text-text-secondary">연구소의 새로운 소식과 안내사항을 확인하세요.</p>
        </div>
        
        <div className="space-y-4">
          {config.notices.length > 0 ? (
            config.notices.map((notice) => (
              <motion.div 
                key={notice.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass-card p-6 md:p-8 rounded-3xl hover:border-accent/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">{notice.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">{notice.content}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary font-medium bg-slate-100 px-3 py-1.5 rounded-full w-fit">
                    <Calendar size={14} /> {notice.date}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-text-secondary">등록된 공지사항이 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// --- Admin Dashboard Component ---
function AdminDashboard({ config, onUpdateConfig, onFileUpload }: { 
  config: SiteConfig, 
  onUpdateConfig: (updates: Partial<SiteConfig>) => void,
  onFileUpload: (file: File) => Promise<string>,
}) {
  const [activeAdminTab, setActiveAdminTab] = useState<'content' | 'design' | 'notices' | 'images'>('content');
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });
  const [newFacilityImage, setNewFacilityImage] = useState({ name: '', src: '' });
  const [isUploading, setIsUploading] = useState(false);

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.content) return;
    const notice: Notice = {
      id: Date.now().toString(),
      title: newNotice.title,
      content: newNotice.content,
      date: new Date().toISOString().split('T')[0]
    };
    onUpdateConfig({ notices: [notice, ...config.notices] });
    setNewNotice({ title: '', content: '' });
  };

  const handleDeleteNotice = (id: string) => {
    onUpdateConfig({ notices: config.notices.filter(n => n.id !== id) });
  };

  const handleAddFacilityImage = () => {
    if (!newFacilityImage.name || !newFacilityImage.src) return;
    const newImg: FacilityImage = {
      id: Date.now().toString(),
      src: newFacilityImage.src,
      name: newFacilityImage.name
    };
    onUpdateConfig({ facilityImages: [...config.facilityImages, newImg] });
    setNewFacilityImage({ name: '', src: '' });
  };

  const handleDeleteFacilityImage = (id: string) => {
    onUpdateConfig({ facilityImages: config.facilityImages.filter(img => img.id !== id) });
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const base64 = await onFileUpload(file);
      onUpdateConfig({ heroBgImage: base64 });
    } catch (err) {
      console.error(err);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFacilityImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const base64 = await onFileUpload(file);
      setNewFacilityImage({ ...newFacilityImage, src: base64 });
    } catch (err) {
      console.error(err);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex items-center justify-between border-b border-black/10 pb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="text-accent" /> 관리자 대시보드
          </h1>
          <p className="text-text-secondary mt-2">웹사이트의 모든 콘텐츠와 디자인을 관리합니다.</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button 
              onClick={() => {
                const configStr = JSON.stringify(config, null, 2);
                navigator.clipboard.writeText(configStr);
                alert('설정 JSON이 클립보드에 복사되었습니다. 나중에 복구할 때 사용할 수 있습니다.');
              }}
              className="text-xs bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-colors"
            >
              <Save size={14} /> 현재 설정 JSON 복사
            </button>
            <button 
              onClick={() => {
                if (window.confirm('모든 설정을 초기 상태로 되돌리시겠습니까? 저장되지 않은 변경사항은 사라집니다.')) {
                  localStorage.removeItem('site-config');
                  window.location.reload();
                }
              }}
              className="text-xs text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-colors"
            >
              <Trash2 size={14} /> 설정 초기화
            </button>
          </div>
        </div>
        <div className="flex gap-2 p-1 glass-card rounded-xl">
          {[
            { id: 'content', label: '콘텐츠 관리' },
            { id: 'notices', label: '공지사항 관리' },
            { id: 'images', label: '이미지 관리' },
            { id: 'design', label: '디자인 설정' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeAdminTab === tab.id ? 'bg-accent text-white font-bold' : 'hover:bg-black/5'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {activeAdminTab === 'content' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><Type className="text-accent" /> 메인 텍스트 관리</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase font-bold">히어로 제목</label>
                  <textarea 
                    value={config.heroTitle}
                    onChange={(e) => onUpdateConfig({ heroTitle: e.target.value })}
                    className="w-full bg-black/5 border border-black/10 rounded-xl p-4 text-sm focus:border-accent outline-none h-32"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase font-bold">히어로 부제목</label>
                  <textarea 
                    value={config.heroSubtitle}
                    onChange={(e) => onUpdateConfig({ heroSubtitle: e.target.value })}
                    className="w-full bg-black/5 border border-black/10 rounded-xl p-4 text-sm focus:border-accent outline-none h-32"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs text-text-secondary uppercase font-bold">연구소 소개 텍스트</label>
                  <textarea 
                    value={config.aboutText}
                    onChange={(e) => onUpdateConfig({ aboutText: e.target.value })}
                    className="w-full bg-black/5 border border-black/10 rounded-xl p-4 text-sm focus:border-accent outline-none h-48"
                  />
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><Phone className="text-accent" /> 연락처 및 정보 관리</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase font-bold">전화번호</label>
                  <input 
                    type="text"
                    value={config.contactPhone}
                    onChange={(e) => onUpdateConfig({ contactPhone: e.target.value })}
                    className="w-full bg-black/5 border border-black/10 rounded-xl p-4 text-sm focus:border-accent outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase font-bold">이메일</label>
                  <input 
                    type="text"
                    value={config.contactEmail}
                    onChange={(e) => onUpdateConfig({ contactEmail: e.target.value })}
                    className="w-full bg-black/5 border border-black/10 rounded-xl p-4 text-sm focus:border-accent outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase font-bold">주소</label>
                  <input 
                    type="text"
                    value={config.contactAddress}
                    onChange={(e) => onUpdateConfig({ contactAddress: e.target.value })}
                    className="w-full bg-black/5 border border-black/10 rounded-xl p-4 text-sm focus:border-accent outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeAdminTab === 'notices' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><Plus className="text-accent" /> 새 공지사항 작성</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase font-bold">제목</label>
                  <input 
                    type="text"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    placeholder="공지사항 제목을 입력하세요"
                    className="w-full bg-black/5 border border-black/10 rounded-xl p-4 text-sm focus:border-accent outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase font-bold">내용</label>
                  <textarea 
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    placeholder="공지사항 내용을 입력하세요"
                    className="w-full bg-black/5 border border-black/10 rounded-xl p-4 text-sm focus:border-accent outline-none h-32"
                  />
                </div>
                <button 
                  onClick={handleAddNotice}
                  className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Save size={18} /> 공지사항 등록하기
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold px-2">등록된 공지사항 목록</h3>
              {config.notices.map((notice) => (
                <div key={notice.id} className="glass-card p-6 rounded-2xl flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold">{notice.title}</h4>
                    <p className="text-sm text-text-secondary line-clamp-2">{notice.content}</p>
                    <p className="text-xs text-text-secondary mt-2">{notice.date}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteNotice(notice.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeAdminTab === 'images' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><ImageIcon className="text-accent" /> 메인 배경 이미지 관리</h2>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden border border-black/10 bg-black/5">
                  <img src={config.heroBgImage} alt="Hero Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-sm text-text-secondary">연구소 메인 화면 상단의 배경 이미지를 직접 촬영한 사진으로 변경할 수 있습니다.</p>
                  <div className="flex flex-col gap-3">
                    <label className="cursor-pointer bg-accent text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Plus size={18} /> 실제 사진 업로드하기
                      <input type="file" className="hidden" accept="image/*" onChange={handleHeroImageUpload} disabled={isUploading} />
                    </label>
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary uppercase font-bold">또는 이미지 URL 입력</label>
                      <input 
                        type="text"
                        value={config.heroBgImage}
                        onChange={(e) => onUpdateConfig({ heroBgImage: e.target.value })}
                        className="w-full bg-black/5 border border-black/10 rounded-xl p-3 text-sm focus:border-accent outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-8">
              <h2 className="text-xl font-bold flex items-center gap-2"><Layout className="text-accent" /> 시설 안내 이미지 관리</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold">새 시설 사진 추가</h3>
                  <div className="space-y-4 p-6 bg-black/5 rounded-2xl">
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary uppercase font-bold">공간 이름 (예: 상담실 1)</label>
                      <input 
                        type="text"
                        value={newFacilityImage.name}
                        onChange={(e) => setNewFacilityImage({ ...newFacilityImage, name: e.target.value })}
                        className="w-full bg-white border border-black/10 rounded-xl p-3 text-sm focus:border-accent outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-text-secondary uppercase font-bold">사진 선택</label>
                      <div className="flex gap-4">
                        {newFacilityImage.src && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden border border-black/10">
                            <img src={newFacilityImage.src} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <label className="flex-1 cursor-pointer border-2 border-dashed border-black/10 rounded-xl flex flex-col items-center justify-center p-4 hover:border-accent transition-colors">
                          <Plus className="text-text-secondary" />
                          <span className="text-xs text-text-secondary mt-1">파일 선택</span>
                          <input type="file" className="hidden" accept="image/*" onChange={handleFacilityImageUpload} />
                        </label>
                      </div>
                    </div>
                    <button 
                      onClick={handleAddFacilityImage}
                      disabled={!newFacilityImage.name || !newFacilityImage.src}
                      className="w-full bg-accent text-white font-bold py-3 rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity"
                    >
                      시설 사진 리스트에 추가
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold">현재 등록된 시설 사진 ({config.facilityImages.length})</h3>
                  <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                    {config.facilityImages.map((img) => (
                      <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-black/10">
                        <img src={img.src} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                          <span className="text-white text-[10px] font-bold mb-2">{img.name}</span>
                          <button 
                            onClick={() => handleDeleteFacilityImage(img.id)}
                            className="bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeAdminTab === 'design' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="glass-card p-8 rounded-3xl space-y-8">
              <h2 className="text-xl font-bold flex items-center gap-2"><Palette className="text-accent" /> 테마 및 스타일 설정</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-sm font-bold">포인트 컬러 (Accent Color)</label>
                  <div className="flex gap-4 items-center">
                    <input 
                      type="color" 
                      value={config.primaryColor}
                      onChange={(e) => onUpdateConfig({ primaryColor: e.target.value })}
                      className="w-12 h-12 rounded-lg bg-transparent cursor-pointer"
                    />
                    <div className="flex gap-2">
                      {['#22c55e', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6'].map(color => (
                        <button 
                          key={color}
                          onClick={() => onUpdateConfig({ primaryColor: color })}
                          className="w-8 h-8 rounded-full border border-black/10"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold flex items-center gap-2">
                    <ImageIcon size={16} /> 히어로 배경 이미지 URL
                  </label>
                  <input 
                    type="text"
                    value={config.heroBgImage}
                    onChange={(e) => onUpdateConfig({ heroBgImage: e.target.value })}
                    placeholder="이미지 URL을 입력하세요"
                    className="w-full bg-black/5 border border-black/10 rounded-xl p-4 text-sm focus:border-accent outline-none"
                  />
                  <p className="text-xs text-text-secondary">메인 화면 상단의 배경 이미지를 변경합니다.</p>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold">메인 폰트 (Font Family)</label>
                  <select 
                    value={config.fontFamily}
                    onChange={(e) => onUpdateConfig({ fontFamily: e.target.value })}
                    className="w-full md:w-64 bg-black/5 border border-black/10 rounded-xl p-4 text-sm focus:border-accent outline-none"
                  >
                    <option value="Inter">Inter (Modern Sans)</option>
                    <option value="system-ui">System Sans</option>
                    <option value="Georgia">Georgia (Classic Serif)</option>
                    <option value="Courier New">Courier (Monospace)</option>
                  </select>
                </div>

                <div className="space-y-4 pt-8 border-t border-black/5">
                  <label className="text-sm font-bold flex items-center gap-2">
                    <Lock size={16} /> 관리자 비밀번호 변경
                  </label>
                  <div className="flex gap-3">
                    <input 
                      type="text"
                      value={config.adminPassword || ''}
                      onChange={(e) => onUpdateConfig({ adminPassword: e.target.value })}
                      placeholder="새 비밀번호 입력"
                      className="flex-1 bg-black/5 border border-black/10 rounded-xl p-4 text-sm focus:border-accent outline-none"
                    />
                  </div>
                  <p className="text-xs text-text-secondary">관리자 모드 진입 시 사용할 비밀번호를 설정합니다. (기본값: admin)</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
