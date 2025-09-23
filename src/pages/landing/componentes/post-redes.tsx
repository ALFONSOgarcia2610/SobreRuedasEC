import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
    Heart,
    MessageCircle,
    Share,
    Eye,
    Play,
    Facebook,
    Instagram,
    Music,
    Users,
    CheckCircle,
    Clock
} from "lucide-react";

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
            content: 'Sorteo Oficial Chevrolet Cavalier 2025: Alcanzamos el 45% de participaciones registradas. Sistema auditado y certificado.',
            image: 'https://via.placeholder.com/400x300?text=Chevrolet+Cavalier+2025',
            likes: 245,
            comments: 67,
            shares: 89,
            date: '2 horas',
            author: 'SobreRuedas Ecuador Oficial',
            profileImage: 'https://via.placeholder.com/50x50?text=SR'
        },
        {
            id: 'fb2',
            platform: 'facebook',
            content: 'Números Premium Disponibles: Serie especial con certificación digital incluida. Proceso transparente y auditado.',
            likes: 189,
            comments: 34,
            shares: 45,
            date: '5 horas',
            author: 'SobreRuedas Ecuador Oficial',
            profileImage: 'https://via.placeholder.com/50x50?text=SR'
        },
        {
            id: 'fb3',
            platform: 'facebook',
            content: 'Tutorial Oficial: Guía completa del proceso de participación. Registro seguro en 3 pasos verificados.',
            video: 'https://via.placeholder.com/400x225?text=Tutorial+Oficial',
            likes: 156,
            comments: 28,
            shares: 67,
            date: '8 horas',
            author: 'SobreRuedas Ecuador Oficial',
            profileImage: 'https://via.placeholder.com/50x50?text=SR'
        },
        {
            id: 'fb4',
            platform: 'facebook',
            content: 'Testimonios Certificados: Experiencias verificadas de participantes anteriores. Proceso auditado por terceros.',
            image: 'https://via.placeholder.com/400x300?text=Testimonios+Oficiales',
            likes: 234,
            comments: 45,
            shares: 78,
            date: '12 horas',
            author: 'SobreRuedas Ecuador Oficial',
            profileImage: 'https://via.placeholder.com/50x50?text=SR'
        },

        // Instagram Posts
        {
            id: 'ig1',
            platform: 'instagram',
            content: 'Proceso Transparente: Documentación completa de nuestro sistema de sorteo certificado. #SorteoOficial #Transparencia',
            image: 'https://via.placeholder.com/400x400?text=Proceso+Certificado',
            likes: 567,
            comments: 89,
            date: '1 hora',
            author: '@sobreruedas_oficial',
            profileImage: 'https://via.placeholder.com/50x50?text=IG'
        },
        {
            id: 'ig2',
            platform: 'instagram',
            content: 'Behind the Scenes: Auditoría independiente de nuestro sistema de sorteo. Transparencia total garantizada.',
            image: 'https://via.placeholder.com/400x400?text=Auditoria+Independiente',
            likes: 423,
            comments: 56,
            date: '4 horas',
            author: '@sobreruedas_oficial',
            profileImage: 'https://via.placeholder.com/50x50?text=IG'
        },
        {
            id: 'ig3',
            platform: 'instagram',
            content: 'Información Técnica: Números con certificación digital avanzada. Sistema blockchain para máxima seguridad.',
            image: 'https://via.placeholder.com/400x400?text=Certificacion+Digital',
            likes: 334,
            comments: 67,
            date: '7 horas',
            author: '@sobreruedas_oficial',
            profileImage: 'https://via.placeholder.com/50x50?text=IG'
        },
        {
            id: 'ig4',
            platform: 'instagram',
            content: 'Especificaciones Técnicas: Chevrolet Cavalier 2025 con todas las características oficiales del fabricante.',
            image: 'https://via.placeholder.com/400x400?text=Especificaciones+Oficiales',
            likes: 789,
            comments: 123,
            date: '10 horas',
            author: '@sobreruedas_oficial',
            profileImage: 'https://via.placeholder.com/50x50?text=IG'
        },

        // TikTok Posts
        {
            id: 'tt1',
            platform: 'tiktok',
            content: 'Update Oficial: Progreso del sorteo Chevrolet Cavalier. Participaciones restantes y cronograma actualizado.',
            video: 'https://via.placeholder.com/300x400?text=Update+Oficial',
            likes: 12400,
            comments: 456,
            views: 89000,
            date: '3 horas',
            author: '@sobreruedas_oficial',
            profileImage: 'https://via.placeholder.com/50x50?text=TT'
        },
        {
            id: 'tt2',
            platform: 'tiktok',
            content: 'Tutorial Express: Proceso de registro oficial paso a paso. Sistema seguro y auditado.',
            video: 'https://via.placeholder.com/300x400?text=Tutorial+Registro',
            likes: 8900,
            comments: 234,
            views: 67000,
            date: '6 horas',
            author: '@sobreruedas_oficial',
            profileImage: 'https://via.placeholder.com/50x50?text=TT'
        },
        {
            id: 'tt3',
            platform: 'tiktok',
            content: 'Tecnología Avanzada: Sistema de numeración digital con certificación blockchain. Máxima seguridad.',
            video: 'https://via.placeholder.com/300x400?text=Tecnologia+Blockchain',
            likes: 15600,
            comments: 678,
            views: 120000,
            date: '9 horas',
            author: '@sobreruedas_oficial',
            profileImage: 'https://via.placeholder.com/50x50?text=TT'
        },
        {
            id: 'tt4',
            platform: 'tiktok',
            content: 'Anuncio Oficial: Cronograma de sorteo y proceso de verificación de ganadores. Sistema auditado.',
            video: 'https://via.placeholder.com/300x400?text=Anuncio+Oficial',
            likes: 23400,
            comments: 891,
            views: 234000,
            date: '11 horas',
            author: '@sobreruedas_oficial',
            profileImage: 'https://via.placeholder.com/50x50?text=TT'
        }
    ]);

    const facebookPosts = posts.filter(post => post.platform === 'facebook').slice(0, 4);
    const instagramPosts = posts.filter(post => post.platform === 'instagram').slice(0, 4);
    const tiktokPosts = posts.filter(post => post.platform === 'tiktok').slice(0, 4);

    const getPlatformColor = (platform: string) => {
        switch (platform) {
            case 'facebook': return 'border-blue-500/30 bg-slate-800 hover:bg-slate-700';
            case 'instagram': return 'border-pink-500/30 bg-slate-800 hover:bg-slate-700';
            case 'tiktok': return 'border-amber-400/30 bg-slate-800 hover:bg-slate-700';
            default: return 'border-gray-300/30 bg-slate-800 hover:bg-slate-700';
        }
    };

    const getPlatformIcon = (platform: string, size: number = 16) => {
        switch (platform) {
            case 'facebook': return <Facebook size={size} className="text-blue-400" />;
            case 'instagram': return <Instagram size={size} className="text-pink-400" />;
            case 'tiktok': return <Music size={size} className="text-amber-400" />;
            default: return <Users size={size} className="text-gray-400" />;
        }
    };

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const PostCard = ({ post }: { post: SocialPost }) => (
        <Card className={`transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/10 border ${getPlatformColor(post.platform)} backdrop-blur-sm`}>
            <CardContent className="p-2 sm:p-3">
                {/* Header del post */}
                <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1.5 sm:mb-2">
                    <img
                        src={post.profileImage}
                        alt={post.author}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                            <span className="font-semibold text-white text-[10px] sm:text-xs truncate">{post.author}</span>
                            {getPlatformIcon(post.platform, 10)}
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock size={8} className="text-gray-400" />
                            <span className="text-[9px] sm:text-xs text-gray-400">{post.date}</span>
                        </div>
                    </div>
                </div>

                {/* Contenido del post */}
                <p className="text-[10px] sm:text-xs text-gray-300 mb-1.5 sm:mb-2 leading-relaxed line-clamp-3">{post.content}</p>

                {/* Imagen o Video */}
                {post.image && (
                    <div className="mb-1.5 sm:mb-2 rounded-md overflow-hidden">
                        <img
                            src={post.image}
                            alt="Post content"
                            className="w-full h-16 sm:h-24 object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                {post.video && (
                    <div className="mb-1.5 sm:mb-2 rounded-md overflow-hidden bg-slate-700">
                        <div className="w-full h-16 sm:h-24 flex items-center justify-center relative">
                            <img
                                src={post.video}
                                alt="Video thumbnail"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-400/90 rounded-full flex items-center justify-center">
                                    <Play size={12} className="sm:hidden text-slate-900 ml-0.5" />
                                    <Play size={16} className="hidden sm:block text-slate-900 ml-0.5" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Estadísticas del post */}
                <div className="flex items-center justify-between text-[9px] sm:text-xs text-gray-400 pt-1 sm:pt-1.5 border-t border-gray-700">
                    <div className="flex items-center space-x-1.5 sm:space-x-3">
                        <span className="flex items-center space-x-0.5">
                            <Heart size={8} className="sm:hidden text-red-400" />
                            <Heart size={10} className="hidden sm:block text-red-400" />
                            <span className="text-[9px] sm:text-xs">{formatNumber(post.likes)}</span>
                        </span>
                        <span className="flex items-center space-x-0.5">
                            <MessageCircle size={8} className="sm:hidden text-blue-400" />
                            <MessageCircle size={10} className="hidden sm:block text-blue-400" />
                            <span className="text-[9px] sm:text-xs">{formatNumber(post.comments)}</span>
                        </span>
                        {post.shares && (
                            <span className="items-center space-x-0.5 hidden sm:flex">
                                <Share size={10} className="text-green-400" />
                                <span className="text-xs">{formatNumber(post.shares)}</span>
                            </span>
                        )}
                        {post.views && (
                            <span className="flex items-center space-x-0.5">
                                <Eye size={8} className="sm:hidden text-purple-400" />
                                <Eye size={10} className="hidden sm:block text-purple-400" />
                                <span className="text-[9px] sm:text-xs">{formatNumber(post.views)}</span>
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-12">
            {/* Título principal */}
            <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
                    Canales Oficiales de Información
                </h2>
                <p className="text-xs sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-2 sm:px-0">
                    Manténgase informado a través de nuestros canales oficiales verificados
                </p>
            </div>

            {/* Facebook Section */}
            <div className="mb-6 sm:mb-12">
                <div className="flex items-center justify-center mb-3 sm:mb-6">
                    <div className="bg-blue-500 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center space-x-1.5 sm:space-x-2">
                        <Facebook size={12} className="sm:hidden" />
                        <Facebook size={16} className="hidden sm:block" />
                        <span className="font-bold text-xs sm:text-base">Facebook Oficial</span>
                        <span className="bg-blue-400 px-1.5 py-0.5 rounded-full text-[9px] sm:text-xs">
                            <CheckCircle size={8} className="sm:hidden inline mr-0.5" />
                            <CheckCircle size={10} className="hidden sm:inline mr-1" />
                            Verificado
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                    {facebookPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>

            {/* Instagram Section */}
            <div className="mb-6 sm:mb-12">
                <div className="flex items-center justify-center mb-3 sm:mb-6">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center space-x-1.5 sm:space-x-2">
                        <Instagram size={12} className="sm:hidden" />
                        <Instagram size={16} className="hidden sm:block" />
                        <span className="font-bold text-xs sm:text-base">Instagram Oficial</span>
                        <span className="bg-pink-400 px-1.5 py-0.5 rounded-full text-[9px] sm:text-xs">
                            <CheckCircle size={8} className="sm:hidden inline mr-0.5" />
                            <CheckCircle size={10} className="hidden sm:inline mr-1" />
                            Verificado
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                    {instagramPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>

            {/* TikTok Section */}
            <div className="mb-6 sm:mb-12">
                <div className="flex items-center justify-center mb-3 sm:mb-6">
                    <div className="bg-amber-500 text-slate-900 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center space-x-1.5 sm:space-x-2">
                        <Music size={12} className="sm:hidden" />
                        <Music size={16} className="hidden sm:block" />
                        <span className="font-bold text-xs sm:text-base">TikTok Oficial</span>
                        <span className="bg-amber-400 px-1.5 py-0.5 rounded-full text-[9px] sm:text-xs">
                            <CheckCircle size={8} className="sm:hidden inline mr-0.5" />
                            <CheckCircle size={10} className="hidden sm:inline mr-1" />
                            Verificado
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                    {tiktokPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>


        </div>
    );
}
