call plug#begin('~/.local/share/nvim/plugged')

" File System Plugins
" ============================================
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' } " File Navigation
Plug 'roman/golden-ratio' " Enlarges the window currently active
Plug 'danro/rename.vim' " Allows to rename files

" Git Plugin
" ============================================
Plug 'tpope/vim-fugitive' " Git Wrapper

" Command Line Plugin
" ============================================
Plug 'vim-airline/vim-airline' " Status line

" Formatting Plugin
" ============================================
Plug 'nathanaelkane/vim-indent-guides' " Indent guide
Plug 'prettier/vim-prettier' " Prettier code formatting
Plug 'pangloss/vim-javascript' " improve javascript syntax
Plug 'mxw/vim-jsx' " improve React JSX syntax
Plug 'jiangmiao/auto-pairs' " Auto adds ending brackets

" Code Checking/Correction Plugin
" ============================================
Plug 'w0rp/ale' " Add ESLint
Plug 'valloric/youcompleteme' " Auto Complete, need to install CMake and Studio code. Check install guide for more details

" Colour Themes Plugin
" ============================================
Plug 'julioju/neovim-qt-colors-solarized-truecolor-only' " Solarized Colour theme for nvm-qt

call plug#end()
