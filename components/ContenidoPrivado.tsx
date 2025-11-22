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
                <header className="flex items-center justify-between mb-2">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Panel agrícola inteligente
                        </h2>
                        {user && (
                            <p className="text-xs md:text-sm text-slate-500">
                                Bienvenido, <span className="font-medium">{user.name}</span>
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onLogout}
                        className="text-xs md:text-sm font-medium text-slate-500 hover:text-red-500 cursor-pointer"
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
