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
    TrendingUp,
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
            case 'facebook': return 'border-blue-500 bg-blue-50';
            case 'instagram': return 'border-pink-500 bg-pink-50';
            case 'tiktok': return 'border-black bg-gray-50';
            default: return 'border-gray-300 bg-gray-50';
        }
    };

    const getPlatformIcon = (platform: string, size: number = 16) => {
        switch (platform) {
            case 'facebook': return <Facebook size={size} className="text-blue-600" />;
            case 'instagram': return <Instagram size={size} className="text-pink-600" />;
            case 'tiktok': return <Music size={size} className="text-black" />;
            default: return <Users size={size} className="text-gray-600" />;
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
            <CardContent className="p-3 sm:p-4">
                {/* Header del post */}
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <img
                        src={post.profileImage}
                        alt={post.author}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <span className="font-semibold text-slate-800 text-xs sm:text-sm truncate">{post.author}</span>
                            {getPlatformIcon(post.platform, 14)}
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock size={10} className="text-slate-400" />
                            <span className="text-xs text-slate-500">{post.date}</span>
                        </div>
                    </div>
                </div>

                {/* Contenido del post */}
                <p className="text-xs sm:text-sm text-slate-700 mb-2 sm:mb-3 leading-relaxed line-clamp-3">{post.content}</p>

                {/* Imagen o Video */}
                {post.image && (
                    <div className="mb-2 sm:mb-3 rounded-lg overflow-hidden">
                        <img
                            src={post.image}
                            alt="Post content"
                            className="w-full h-24 sm:h-32 object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                {post.video && (
                    <div className="mb-2 sm:mb-3 rounded-lg overflow-hidden bg-gray-100">
                        <div className="w-full h-24 sm:h-32 flex items-center justify-center relative">
                            <img
                                src={post.video}
                                alt="Video thumbnail"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                                    <Play size={16} className="sm:hidden text-gray-700 ml-0.5" />
                                    <Play size={20} className="hidden sm:block text-gray-700 ml-0.5" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Estadísticas del post */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1.5 sm:pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <span className="flex items-center space-x-1">
                            <Heart size={10} className="sm:hidden text-red-500" />
                            <Heart size={12} className="hidden sm:block text-red-500" />
                            <span className="text-xs">{formatNumber(post.likes)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <MessageCircle size={10} className="sm:hidden text-blue-500" />
                            <MessageCircle size={12} className="hidden sm:block text-blue-500" />
                            <span className="text-xs">{formatNumber(post.comments)}</span>
                        </span>
                        {post.shares && (
                            <span className="flex items-center space-x-1 hidden sm:flex">
                                <Share size={12} className="text-green-500" />
                                <span className="text-xs">{formatNumber(post.shares)}</span>
                            </span>
                        )}
                        {post.views && (
                            <span className="flex items-center space-x-1">
                                <Eye size={10} className="sm:hidden text-purple-500" />
                                <Eye size={12} className="hidden sm:block text-purple-500" />
                                <span className="text-xs">{formatNumber(post.views)}</span>
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-16">
            {/* Título principal */}
            <div className="text-center mb-8 sm:mb-12">
              
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 sm:mb-4">
                    Canales Oficiales de Información
                </h2>
                <p className="text-sm sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-2 sm:px-0">
                    Manténgase informado a través de nuestros canales oficiales verificados
                </p>
            </div>

            {/* Facebook Section */}
            <div className="mb-8 sm:mb-16">
                <div className="flex items-center justify-center mb-4 sm:mb-8">
                    <div className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center space-x-2 sm:space-x-3">
                        <Facebook size={16} className="sm:hidden" />
                        <Facebook size={20} className="hidden sm:block" />
                        <span className="font-bold text-sm sm:text-lg">Facebook Oficial</span>
                        <span className="bg-blue-400 px-2 py-1 rounded-full text-xs">
                            <CheckCircle size={10} className="inline mr-1" />
                            Verificado
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {facebookPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>

            {/* Instagram Section */}
            <div className="mb-8 sm:mb-16">
                <div className="flex items-center justify-center mb-4 sm:mb-8">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center space-x-2 sm:space-x-3">
                        <Instagram size={16} className="sm:hidden" />
                        <Instagram size={20} className="hidden sm:block" />
                        <span className="font-bold text-sm sm:text-lg">Instagram Oficial</span>
                        <span className="bg-pink-400 px-2 py-1 rounded-full text-xs">
                            <CheckCircle size={10} className="inline mr-1" />
                            Verificado
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {instagramPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>

            {/* TikTok Section */}
            <div className="mb-8 sm:mb-16">
                <div className="flex items-center justify-center mb-4 sm:mb-8">
                    <div className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center space-x-2 sm:space-x-3">
                        <Music size={16} className="sm:hidden" />
                        <Music size={20} className="hidden sm:block" />
                        <span className="font-bold text-sm sm:text-lg">TikTok Oficial</span>
                        <span className="bg-gray-700 px-2 py-1 rounded-full text-xs">
                            <CheckCircle size={10} className="inline mr-1" />
                            Verificado
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {tiktokPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>

    
        </div>
    );
}
