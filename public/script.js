const editor = grapesjs.init({
    container: '#gjs',
    height: '100vh',
    width: 'auto',
    storageManager: { autoload: 0 },
    assetManager: {
        embedAsBase64: true,
        assets: []
    },
    plugins: [
        'gjs-preset-webpage',
        'gjs-blocks-basic',
        'grapesjs-plugin-forms',
        'grapesjs-navbar',
        'grapesjs-lory-slider',
        'grapesjs-tabs',
        'grapesjs-custom-code',
        'grapesjs-typed',
        'grapesjs-tooltip',
        'grapesjs-tui-image-editor',
        'grapesjs-style-bg'
    ],
    pluginsOpts: {
        'gjs-preset-webpage': {
            blocksBasicOpts: { flexGrid: 1 },
            navbarOpts: true,
            countdownOpts: true,
            formsOpts: true,
            blocks: ['link-block', 'quote', 'text-basic']
        }
    }
});
// 添加文本块
editor.BlockManager.add('text-block', {
    label: 'Text Block',
    content: '<div class="text-block"><p>This is a simple text block. You can edit me.</p></div>',
    category: 'Basic',
});

// 添加图片块
editor.BlockManager.add('image-block', {
    label: 'Image Block',
    content: {
        type: 'image',
        style: { width: '100px', height: '100px', margin: '10px auto' },
        activeOnRender: 1
    },
    category: 'Basic',
});

// 链接块
editor.BlockManager.add('link-block', {
    label: 'Link Block',
    content: '<a href="https://example.com">Visit Example.com</a>',
    category: 'Basic',
});

// 按钮
editor.BlockManager.add('button-block', {
    label: 'Button',
    content: '<button class="btn btn-primary">Click me</button>',
    category: 'Forms',
});

// 列表
editor.BlockManager.add('list-block', {
    label: 'List Block',
    content: '<ul><li>List Item 1</li><li>List Item 2</li><li>List Item 3</li></ul>',
    category: 'Basic',
});

// 导航
editor.BlockManager.add('navbar-block', {
    label: 'Navbar Block',
    content: `<nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">WebSiteName</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Home</a></li>
                        <li><a href="#">Page 1</a></li>
                        <li><a href="#">Page 2</a></li>
                    </ul>
                </div>
            </nav>`,
    category: 'Advanced',
});

// 添加高级块 P.S.actually... this is just a text block with classy name...
editor.BlockManager.add('advanced-block', {
    label: 'Advanced Block',
    content: '<div class="advanced-block"><p>Advanced content here</p></div>',
    category: 'Advanced',
});

// 添加表单块，类似于demo中的订阅表单
editor.BlockManager.add('form-block', {
    label: 'Subscription Form',
    content: {
        type: 'form',
        components: [{
            type: 'input',
            attributes: { type: 'text', placeholder: 'Enter your name' }
        }, {
            type: 'input',
            attributes: { type: 'email', placeholder: 'Enter your email' }
        }, {
            type: 'button',
            content: 'Subscribe',
            style: { padding: '10px', 'font-size': '16px' }
        }]
    },
    category: 'Forms',
});

editor.BlockManager.add('header-banner', {
    label: 'Header Banner',
    attributes: { class: 'fa fa-header' }, // 可以使用 Font Awesome 图标
    content: {
        tagName: 'div',
        style: {
            height: '300px',
            background: 'url(https://via.placeholder.com/1500x300) no-repeat center center',
            backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '2rem',
            textTransform: 'uppercase'
        },
        components: [
            {
                type: 'text',
                content: 'Welcome to Our Website!',
                style: {
                    textAlign: 'center',
                    width: '100%',
                    padding: '15px 20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff'
                }
            }
        ]
    },
    category: 'Basic',
});

// 添加双列块
editor.BlockManager.add('double-columns-block', {
    label: 'Double Columns',
    content: '<div class="double-columns" style="display: flex;"><div class="column" style="flex: 1; padding: 10px;"><p>Column 1</p></div><div class="column" style="flex: 1; padding: 10px;"><p>Column 2</p></div></div>',
    category: 'Basic',
});
// Triple Columns Block
editor.BlockManager.add('triple-columns-block', {
    label: 'Triple Columns',
    content: '<div class="triple-columns" style="display: flex;"><div class="column" style="flex: 1; padding: 10px;"><p>Column 1</p></div><div class="column" style="flex: 1; padding: 10px;"><p>Column 2</p></div><div class="column" style="flex: 1; padding: 10px;"><p>Column 3</p></div></div>',
    category: 'Basic',
});

window.addEventListener('load', () => {
    document.getElementById('loading-page').style.display = 'none';
});
// Add the Download button to the top panel
editor.Panels.addButton('options', {
    id: 'download',
    className: 'gjs-btn',
    label: 'Download',
    command: 'download-button'
});

// Add the Save button to the top panel
editor.Panels.addButton('options', {
    id: 'save',
    className: 'gjs-btn',
    label: 'Save',
    command: 'save-button'
});
// Define the commands for the buttons
editor.Commands.add('download-button', {
    run: function(editor) {
        const htmlContent = editor.getHtml();
        const cssContent = editor.getCss();
        const link = document.createElement('a');
        const blob = new Blob([htmlContent, '\n<style>', cssContent, '</style>'], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'content.html';
        link.click();
        URL.revokeObjectURL(url);
    }
});

editor.Commands.add('save-button', {
    run: function(editor) {
        const htmlContent = editor.getHtml();
        const cssContent = editor.getCss();

        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ html: htmlContent, css: cssContent }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Content saved successfully!');
                } else {
                    alert('Failed to save content.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while saving content.');
            });
    }
});
// Toggle button functionality[abandoned]
/*document.getElementById('toggle-button').addEventListener('click', () => {
    const buttonsContainer = document.getElementById('buttons-container');
    const toggleButton = document.getElementById('toggle-button');
    if (buttonsContainer.style.display === 'none') {
        buttonsContainer.style.display = 'block';
        toggleButton.textContent = 'Hide';
    } else {
        buttonsContainer.style.display = 'none';
        toggleButton.textContent = 'Menu';
    }
});*/
// Function to update the position of the buttons container

// Load content from server
fetch('/load')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            editor.setComponents(data.html);
            editor.setStyle(data.css);
        } else {
            console.error('Failed to load content.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });