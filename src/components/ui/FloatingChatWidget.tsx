"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Mail, ArrowRight, Clock, CheckCheck } from 'lucide-react';

export function FloatingChatWidget({ locale, dict }: { locale: string; dict: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'main' | 'faq' | 'contact'>('main');
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [message, setMessage] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  const isRTL = locale === 'fa' || locale === 'ar';
  const chatDict = dict.chat || {};

  const quickActions = [
    { icon: Phone, label: chatDict.phone_label || 'Jetzt anrufen', href: 'tel:+4991316146235', color: '#0a0a0a' },
    { icon: Mail, label: chatDict.email_label || 'E-Mail senden', href: 'mailto:info@az-europaservice.de', color: '#0a0a0a' },
  ];

  const faqItems = chatDict.faqs || [];

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* ── FLOATING BUTTON ── */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setActiveTab('main'); setFormSent(false); setSelectedFaq(null); }}
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-[60] w-16 h-16 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center shadow-[0_8px_32px_rgba(19,27,46,0.3)] hover:shadow-[0_12px_40px_rgba(19,27,46,0.4)] transition-all duration-300 group`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat-Fenster öffnen"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-[#fed01b] animate-ping opacity-30" />
        )}

        <span className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-4 h-4 bg-green-500 rounded-full border-2 border-white`} />
      </motion.button>

      {/* ── CHAT PANEL ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-24 ${isRTL ? 'left-6' : 'right-6'} z-[60] w-[380px] max-h-[520px] bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.15)] border border-[#e0e3e5] overflow-hidden flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {/* Header */}
            <div className={`bg-[#0a0a0a] px-6 py-5 flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-[#fed01b] flex items-center justify-center text-[#0a0a0a] font-black text-sm">AZ</div>
                <span className={`absolute -bottom-0.5 ${isRTL ? '-left-0.5' : '-right-0.5'} w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0a0a0a]`} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">AZ-Europa Service</h3>
                <div className={`flex items-center gap-1.5 mt-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-3 h-3 text-green-400" />
                  <span className="text-green-400 text-xs font-medium">
                    {chatDict.online_status || 'Online'}
                  </span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5">
              <AnimatePresence mode="wait">

                {/* ── MAIN TAB ── */}
                {activeTab === 'main' && (
                  <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className={`flex gap-3 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-8 h-8 rounded-full bg-[#fed01b] flex-shrink-0 flex items-center justify-center text-[10px] font-black text-[#0a0a0a]">AZ</div>
                      <div className={`bg-[#f2f4f6] rounded-2xl ${isRTL ? 'rounded-tr-sm' : 'rounded-tl-sm'} px-4 py-3 max-w-[85%]`}>
                        <p className="text-sm text-[#191c1e] leading-relaxed">
                          {chatDict.welcome || 'Hallo! 👋'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-5">
                      {quickActions.map(({ icon: Icon, label, href }) => (
                        <a
                          key={label}
                          href={href}
                          className={`flex items-center gap-3 px-4 py-3.5 bg-white border border-[#e0e3e5] rounded-xl hover:border-[#0a0a0a] hover:bg-[#f7f9fb] transition-all duration-200 group ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#f2f4f6] flex items-center justify-center group-hover:bg-[#fed01b]/20 transition-colors">
                            <Icon className="w-4 h-4 text-[#0a0a0a]" />
                          </div>
                          <span className="text-sm font-semibold text-[#0a0a0a] flex-1">{label}</span>
                          <ArrowRight className={`w-4 h-4 text-[#c6c6cd] group-hover:text-[#0a0a0a] transition-all ${isRTL ? 'rotate-180' : 'group-hover:translate-x-0.5'}`} />
                        </a>
                      ))}
                    </div>

                    <div className={`grid grid-cols-2 gap-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <button
                        onClick={() => setActiveTab('faq')}
                        className="px-4 py-3 bg-[#f2f4f6] rounded-xl text-sm font-semibold text-[#0a0a0a] hover:bg-[#e6e8ea] transition-colors text-center"
                      >
                        {chatDict.faq_tab || 'FAQ'}
                      </button>
                      <button
                        onClick={() => setActiveTab('contact')}
                        className="px-4 py-3 bg-[#fed01b] rounded-xl text-sm font-semibold text-[#0a0a0a] hover:bg-[#eec200] transition-colors text-center"
                      >
                        {chatDict.direct_msg_tab || 'Message'}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── FAQ TAB ── */}
                {activeTab === 'faq' && (
                  <motion.div key="faq" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                    <button onClick={() => { setActiveTab('main'); setSelectedFaq(null); }} className={`text-xs font-semibold text-[#76777d] hover:text-[#0a0a0a] mb-4 flex items-center gap-1 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {isRTL ? `→ ${chatDict.back || 'Back'}` : `← ${chatDict.back || 'Zurück'}`}
                    </button>
                    <div className="space-y-2">
                      {faqItems.map((faq: any, i: number) => (
                        <div key={i}>
                          <button
                            onClick={() => setSelectedFaq(selectedFaq === i ? null : i)}
                            className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all border ${isRTL ? 'text-right' : ''} ${selectedFaq === i ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]' : 'bg-white text-[#0a0a0a] border-[#e0e3e5] hover:border-[#0a0a0a]'}`}
                          >
                            {faq.q}
                          </button>
                          <AnimatePresence>
                            {selectedFaq === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className={`flex gap-2.5 mt-2 mb-1 ${isRTL ? 'flex-row-reverse pr-2' : 'pl-2'}`}>
                                  <div className="w-6 h-6 rounded-full bg-[#fed01b] flex-shrink-0 flex items-center justify-center text-[8px] font-black text-[#0a0a0a]">AZ</div>
                                  <div className={`bg-[#f2f4f6] rounded-2xl ${isRTL ? 'rounded-tr-sm' : 'rounded-tl-sm'} px-3.5 py-2.5`}>
                                    <p className="text-sm text-[#45464d] leading-relaxed">{faq.a}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── CONTACT TAB ── */}
                {activeTab === 'contact' && (
                  <motion.div key="contact" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                    <button onClick={() => setActiveTab('main')} className={`text-xs font-semibold text-[#76777d] hover:text-[#0a0a0a] mb-4 flex items-center gap-1 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {isRTL ? `→ ${chatDict.back || 'Back'}` : `← ${chatDict.back || 'Zurück'}`}
                    </button>

                    {formSent ? (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
                        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCheck className="w-7 h-7 text-green-500" />
                        </div>
                        <h4 className="font-bold text-[#0a0a0a] text-lg mb-2">
                          {chatDict.sent_success || 'Gesendet!'}
                        </h4>
                        <p className="text-sm text-[#76777d]">
                          {chatDict.sent_desc || 'Wir melden uns in Kürze.'}
                        </p>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}
                        className="space-y-3"
                      >
                        <input
                          ref={nameRef}
                          type="text"
                          placeholder={chatDict.name_placeholder || 'Ihr Name'}
                          required
                          className={`w-full px-4 py-3 rounded-xl border border-[#e0e3e5] bg-[#f7f9fb] text-sm text-[#191c1e] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#0a0a0a] focus:bg-white transition-colors ${isRTL ? 'text-right' : ''}`}
                        />
                        <input
                          type="email"
                          placeholder={chatDict.email_placeholder || 'E-Mail'}
                          required
                          className={`w-full px-4 py-3 rounded-xl border border-[#e0e3e5] bg-[#f7f9fb] text-sm text-[#191c1e] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#0a0a0a] focus:bg-white transition-colors ${isRTL ? 'text-right' : ''}`}
                        />
                        <textarea
                          placeholder={chatDict.msg_placeholder || 'Nachricht...'}
                          required
                          rows={3}
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border border-[#e0e3e5] bg-[#f7f9fb] text-sm text-[#191c1e] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#0a0a0a] focus:bg-white transition-colors resize-none ${isRTL ? 'text-right' : ''}`}
                        />
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-[#fed01b] text-[#0a0a0a] font-bold text-sm rounded-xl hover:bg-[#eec200] transition-colors flex items-center justify-center gap-2"
                        >
                          {chatDict.send_btn || 'Senden'}
                          <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </button>
                        <p className="text-[10px] text-center text-[#b0b0b0] font-medium">
                          {chatDict.legal_note || ''}
                        </p>
                      </form>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-[#f7f9fb] border-t border-[#e0e3e5]">
              <p className="text-[10px] text-[#b0b0b0] text-center font-medium">
                Powered by AZ-Europa Service GmbH • Erlangen
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
