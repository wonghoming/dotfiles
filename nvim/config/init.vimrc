call plug#begin('~/.local/share/nvim/plugged')
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' } " File Navigation
Plug 'roman/golden-ratio' " Enlarges the window currently active
Plug 'tpope/vim-fugitive' " Git Wrapper
Plug 'vim-airline/vim-airline' " Status line
Plug 'nathanaelkane/vim-indent-guides' " Indent guide
Plug 'prettier/vim-prettier' " Prettier code formatting
Plug 'julioju/neovim-qt-colors-solarized-truecolor-only' " Solarized Colour theme for nvm-qt
Plug 'pangloss/vim-javascript' " improve javascript syntax
Plug 'mxw/vim-jsx' " improve React JSX syntax
Plug 'w0rp/ale' " Add ESLint
Plug 'danro/rename.vim' " Allows to rename files
call plug#end()

