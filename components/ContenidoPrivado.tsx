// dentro de app/page.tsx (o donde tengas ContenidoPrivado)
import CropsCatalog from "@/components/CropsCatalog"

type AppUser = {
    id: number;
    email: string;
    name: string;
};

type ContenidoPrivadoProps = {
    user: AppUser | null;
    onLogout: () => void;
};

export default function ContenidoPrivado({ user, onLogout }: ContenidoPrivadoProps) {
    return (
        <section className="border-t border-emerald-50 bg-white/60">
            <div className="max-w-6xl mx-auto px-6 pt-6">
                <header className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-3xl font-semibold mb-2">
                            Panel agrícola inteligente
                        </h2>
                        {user && (
                            <p className="text-xs md:text-lg text-slate-500">
                                Bienvenido, <span className="font-semibold text-primary">{user.name}</span>
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onLogout}
                        className="text-xs md:text-sm font-semibold text-white bg-red-400 px-2 py-2 rounded-lg hover:bg-red-500 cursor-pointer"
                    >
                        Cerrar sesión
                    </button>
                </header>
            </div>

            {/* Catálogo de cultivos protegido por login */}
            <CropsCatalog />s
        </section>
    );
}
