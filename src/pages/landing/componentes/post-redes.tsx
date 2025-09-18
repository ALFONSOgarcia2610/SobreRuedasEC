import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface SocialPost {
    id: string;
    platform: 'facebook' | 'instagram' | 'tiktok';
    content: string;
    image?: string;
    video?: string;
    likes: number;
    comments: number;
    shares?: number;
    views?: number;
    date: string;
    author: string;
    profileImage: string;
}

export function PostRedes() {
    // Datos de ejemplo - En producción estos vendrían de las APIs de cada red social
    const [posts] = useState<SocialPost[]>([
        // Facebook Posts
        {
            id: 'fb1',
            platform: 'facebook',
            content: '🚗 ¡El sorteo del Chevrolet Cavalier 2024 está cada vez más cerca! Ya tenemos el 45% de boletos vendidos. ¿Ya tienes el tuyo?',
            image: 'https://via.placeholder.com/400x300?text=Chevrolet+Cavalier+2024',
            likes: 245,
            comments: 67,
            shares: 89,
            date: '2 horas',
            author: 'SobreRuedas Ecuador',
            profileImage: 'https://via.placeholder.com/50x50?text=SR'
        },
        {
            id: 'fb2',
            platform: 'facebook',
            content: '✨ Números bendecidos de hoy: 0157, 0842, 0693. ¡Estos números ya tienen premio garantizado! 🎯',
            likes: 189,
            comments: 34,
            shares: 45,
            date: '5 horas',
            author: 'SobreRuedas Ecuador',
            profileImage: 'https://via.placeholder.com/50x50?text=SR'
        },
        {
            id: 'fb3',
            platform: 'facebook',
            content: '🎥 Nuevo tutorial: Aprende cómo registrarte y participar en nuestro sorteo en solo 3 minutos.',
            video: 'https://via.placeholder.com/400x225?text=Video+Tutorial',
            likes: 156,
            comments: 28,
            shares: 67,
            date: '8 horas',
            author: 'SobreRuedas Ecuador',
            profileImage: 'https://via.placeholder.com/50x50?text=SR'
        },
        {
            id: 'fb4',
            platform: 'facebook',
            content: '🏆 ¡Testimonios reales! Conoce a nuestros ganadores anteriores y sus experiencias increíbles.',
            image: 'https://via.placeholder.com/400x300?text=Ganadores+Testimonios',
            likes: 234,
            comments: 45,
            shares: 78,
            date: '12 horas',
            author: 'SobreRuedas Ecuador',
            profileImage: 'https://via.placeholder.com/50x50?text=SR'
        },

        // Instagram Posts
        {
            id: 'ig1',
            platform: 'instagram',
            content: '🔥 Story time: El momento exacto cuando supiste que ibas a ganar... #SorteoChevrolet #SobreRuedas',
            image: 'https://via.placeholder.com/400x400?text=Instagram+Story',
            likes: 567,
            comments: 89,
            date: '1 hora',
            author: '@sobreruedas_ec',
            profileImage: 'https://via.placeholder.com/50x50?text=IG'
        },
        {
            id: 'ig2',
            platform: 'instagram',
            content: '✨ Detrás de cámaras: Así es como preparamos cada sorteo para garantizar total transparencia 📸',
            image: 'https://via.placeholder.com/400x400?text=Behind+the+Scenes',
            likes: 423,
            comments: 56,
            date: '4 horas',
            author: '@sobreruedas_ec',
            profileImage: 'https://via.placeholder.com/50x50?text=IG'
        },
        {
            id: 'ig3',
            platform: 'instagram',
            content: '🎯 Tip del día: Los números bendecidos tienen mayor probabilidad de premio instantáneo 💎',
            image: 'https://via.placeholder.com/400x400?text=Lucky+Numbers+Tip',
            likes: 334,
            comments: 67,
            date: '7 horas',
            author: '@sobreruedas_ec',
            profileImage: 'https://via.placeholder.com/50x50?text=IG'
        },
        {
            id: 'ig4',
            platform: 'instagram',
            content: '🚗 Sneak peek del Chevrolet Cavalier 2024 que puede ser tuyo... ¿Te imaginas manejándolo? 😍',
            image: 'https://via.placeholder.com/400x400?text=Chevrolet+Preview',
            likes: 789,
            comments: 123,
            date: '10 horas',
            author: '@sobreruedas_ec',
            profileImage: 'https://via.placeholder.com/50x50?text=IG'
        },

        // TikTok Posts
        {
            id: 'tt1',
            platform: 'tiktok',
            content: '🤯 POV: Cuando te das cuenta que solo faltan 550 boletos para el sorteo del Chevrolet #SorteoEcuador',
            video: 'https://via.placeholder.com/300x400?text=TikTok+Video+1',
            likes: 12400,
            comments: 456,
            views: 89000,
            date: '3 horas',
            author: '@sobreruedas_official',
            profileImage: 'https://via.placeholder.com/50x50?text=TT'
        },
        {
            id: 'tt2',
            platform: 'tiktok',
            content: '💫 Tutorial rápido: Cómo registrarte en 30 segundos para el sorteo más esperado del año',
            video: 'https://via.placeholder.com/300x400?text=Quick+Tutorial',
            likes: 8900,
            comments: 234,
            views: 67000,
            date: '6 horas',
            author: '@sobreruedas_official',
            profileImage: 'https://via.placeholder.com/50x50?text=TT'
        },
        {
            id: 'tt3',
            platform: 'tiktok',
            content: '🎲 Plot twist: Estos números tienen algo especial... ¿Puedes adivinar qué? #NumerosBendecidos',
            video: 'https://via.placeholder.com/300x400?text=Plot+Twist+Video',
            likes: 15600,
            comments: 678,
            views: 120000,
            date: '9 horas',
            author: '@sobreruedas_official',
            profileImage: 'https://via.placeholder.com/50x50?text=TT'
        },
        {
            id: 'tt4',
            platform: 'tiktok',
            content: '🔥 Reacción en vivo: Cuando anunciamos los números ganadores del premio instantáneo',
            video: 'https://via.placeholder.com/300x400?text=Live+Reaction',
            likes: 23400,
            comments: 891,
            views: 234000,
            date: '11 horas',
            author: '@sobreruedas_official',
            profileImage: 'https://via.placeholder.com/50x50?text=TT'
        }
    ]);

    const facebookPosts = posts.filter(post => post.platform === 'facebook').slice(0, 4);
    const instagramPosts = posts.filter(post => post.platform === 'instagram').slice(0, 4);
    const tiktokPosts = posts.filter(post => post.platform === 'tiktok').slice(0, 4);

    const getPlatformColor = (platform: string) => {
        switch (platform) {
            case 'facebook': return 'border-blue-500 bg-blue-50';
            case 'instagram': return 'border-pink-500 bg-pink-50';
            case 'tiktok': return 'border-black bg-gray-50';
            default: return 'border-gray-300 bg-gray-50';
        }
    };

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'facebook': return '📘';
            case 'instagram': return '📷';
            case 'tiktok': return '🎵';
            default: return '📱';
        }
    };

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const PostCard = ({ post }: { post: SocialPost }) => (
        <Card className={`transition-all duration-300 hover:shadow-lg border-2 ${getPlatformColor(post.platform)}`}>
            <CardContent className="p-4">
                {/* Header del post */}
                <div className="flex items-center space-x-3 mb-3">
                    <img
                        src={post.profileImage}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-slate-800 text-sm">{post.author}</span>
                            <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                        </div>
                        <span className="text-xs text-slate-500">{post.date}</span>
                    </div>
                </div>

                {/* Contenido del post */}
                <p className="text-sm text-slate-700 mb-3 leading-relaxed">{post.content}</p>

                {/* Imagen o Video */}
                {post.image && (
                    <div className="mb-3 rounded-lg overflow-hidden">
                        <img
                            src={post.image}
                            alt="Post content"
                            className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                {post.video && (
                    <div className="mb-3 rounded-lg overflow-hidden bg-gray-100">
                        <div className="w-full h-32 flex items-center justify-center relative">
                            <img
                                src={post.video}
                                alt="Video thumbnail"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                                    <span className="text-lg">▶️</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Estadísticas del post */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                            <span>❤️</span>
                            <span>{formatNumber(post.likes)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <span>💬</span>
                            <span>{formatNumber(post.comments)}</span>
                        </span>
                        {post.shares && (
                            <span className="flex items-center space-x-1">
                                <span>📤</span>
                                <span>{formatNumber(post.shares)}</span>
                            </span>
                        )}
                        {post.views && (
                            <span className="flex items-center space-x-1">
                                <span>👁️</span>
                                <span>{formatNumber(post.views)}</span>
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Título principal */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                    📱 Síguenos en Redes Sociales
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Mantente al día con todas las novedades, tips y momentos especiales de nuestros sorteos
                </p>
            </div>

            {/* Facebook Section */}
            <div className="mb-16">
                <div className="flex items-center justify-center mb-8">
                    <div className="bg-blue-500 text-white px-6 py-3 rounded-full flex items-center space-x-3">
                        <span className="text-2xl">📘</span>
                        <span className="font-bold text-lg">Facebook</span>
                        <span className="bg-blue-400 px-2 py-1 rounded-full text-xs">Últimas 4</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {facebookPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>

            {/* Instagram Section */}
            <div className="mb-16">
                <div className="flex items-center justify-center mb-8">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full flex items-center space-x-3">
                        <span className="text-2xl">📷</span>
                        <span className="font-bold text-lg">Instagram</span>
                        <span className="bg-pink-400 px-2 py-1 rounded-full text-xs">Últimas 4</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {instagramPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>

            {/* TikTok Section */}
            <div className="mb-16">
                <div className="flex items-center justify-center mb-8">
                    <div className="bg-black text-white px-6 py-3 rounded-full flex items-center space-x-3">
                        <span className="text-2xl">🎵</span>
                        <span className="font-bold text-lg">TikTok</span>
                        <span className="bg-gray-700 px-2 py-1 rounded-full text-xs">Últimas 4</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tiktokPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">
                        🔔 ¡No te pierdas nada!
                    </h3>
                    <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                        Síguenos en todas nuestras redes sociales para estar al día con sorteos, promociones especiales
                        y ser el primero en conocer a nuestros ganadores.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center space-x-2">
                            <span>📘</span>
                            <span>Seguir en Facebook</span>
                        </button>
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2">
                            <span>📷</span>
                            <span>Seguir en Instagram</span>
                        </button>
                        <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center space-x-2">
                            <span>🎵</span>
                            <span>Seguir en TikTok</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
