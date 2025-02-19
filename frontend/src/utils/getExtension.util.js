let extensionTypeMap = {
    // JavaScript and JSX
    'js': 'javascript',
    'jsx': 'javascript',

    // TypeScript and TSX
    'ts': 'typescript',
    'tsx': 'typescript',

    // CSS and preprocessor styles
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'styl': 'stylus',

    // HTML and templating
    'html': 'html',
    'htm': 'html',

    // JSON and configuration
    'json': 'json',
    'json5': 'json5',
    'yaml': 'yaml',
    'yml': 'yaml',

    // Markdown and documentation
    'md': 'markdown',
    'markdown': 'markdown',

    // Images
    'png': 'image',
    'jpg': 'image',
    'jpeg': 'image',
    'gif': 'image',
    'svg': 'image',
    'webp': 'image',

    // Fonts
    'woff': 'font',
    'woff2': 'font',
    'ttf': 'font',
    'eot': 'font',

    // Videos
    'mp4': 'video',
    'webm': 'video',
    'ogg': 'video',

    // Audio
    'mp3': 'audio',
    'wav': 'audio',
    'ogg': 'audio',

    // Other common file types
    'txt': 'text',
    'csv': 'csv',
    'xml': 'xml',
    'pdf': 'pdf',
    'zip': 'archive',
    'tar': 'archive',
    'gz': 'archive',
    'bz2': 'archive',
    '7z': 'archive',
};

export const getExtension = (extension) => {
    if(!extension){
        return undefined;
    }
    return extensionTypeMap[extension];
}