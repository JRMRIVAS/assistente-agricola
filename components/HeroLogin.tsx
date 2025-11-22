import React from 'react'
import { motion } from 'motion/react';
import { ArrowRight, Sprout, CheckCircle2 } from "lucide-react";

type HeroProps = {
    onOpenLogin: () => void;
};

export default function HeroLogin({ onOpenLogin }: HeroProps) {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden px-4 md:px-8 pt-20">
            {/* Background elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
            </div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
                        <Sprout className="w-4 h-4" />
                        <span>Tecnología Agrícola Inteligente</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-foreground">
                        Tu asistente <br />
                        <span className="text-gradient">agrícola inteligente</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                        Optimiza tu producción con recomendaciones precisas de siembra, riego y cosecha basadas en datos científicos.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button onClick={onOpenLogin} className="h-14 px-8 text-lg rounded-xl bg-[#3CB472] hover:bg-[#3CB472]/90 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 flex items-center text-white cursor-pointer">
                            Ingresar al sistema
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        {/* <button className="h-14 px-8 text-lg rounded-xl border-2 hover:bg-secondary/5 transition-all">
                            Ver demostración
                        </button> */}
                    </div>

                    <div className="pt-8 flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            <span>Datos en tiempo real</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            <span>Análisis predictivo</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="relative hidden lg:block"
                >
                    <div className="relative z-10 glass-panel rounded-3xl p-2 shadow-2xl shadow-emerald-900/10 transform rotate-y-12 hover:rotate-0 transition-transform duration-700 ease-out-expo">
                        <img
                            src="/heroImage.png"
                            alt="Smart Agriculture Dashboard Illustration"
                            className="w-full h-auto rounded-2xl"
                        />

                        {/* Floating UI Elements for depth */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-emerald-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    <Sprout className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">Crecimiento</div>
                                    <div className="text-lg font-bold text-emerald-700">+24%</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl border border-emerald-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">Clima Ideal</div>
                                    <div className="text-lg font-bold text-foreground">24°C</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
