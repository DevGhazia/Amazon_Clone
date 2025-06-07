const cloudName: string = import.meta.env.VITE_CLOUDNIARY_CLOUDNAME;

export default function getCloudinaryUrl(imageUrl: string, side: number): string{
    return `https://res.cloudinary.com/${cloudName}/image/fetch/w_${side},h_${side},c_fill,q_auto,f_auto/${imageUrl}`;
}