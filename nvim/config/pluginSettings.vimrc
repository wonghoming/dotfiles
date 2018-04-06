" Toggle NERDTree files navigation with '<leader>d'
" ======================================================
map <leader>d : execute 'NERDTreeToggle'<CR>

" Settings for Solarized Colour Scheme
" ======================================================
let g:indent_giodes_enable_on_vim_startup = 1

" Settings for Solarized Colour Scheme
" ======================================================
syntax enable
let $NVIM_TUI_ENABLE_TRUE_COLOR=1
set background=dark
colorscheme solarized_nvimqt

" Setting for vim-javascript
" =======================================================
let g:javascript_plugin_jsdoc = 1
let g:javascript_plugin_ngdoc = 1
let g:javascript_plugin_flow = 1

" Prettier Setting
" =======================================================
let g:prettier#exec_cmd_async = 1 " Async Prettier Execution
let g:prettier#config#semi = 'false' " Single quotes
let g:prettier#config#single_quote = 'true' " Single quotes
let g:prettier#config#bracket_spacing = 'true' " Spaces in Brackets

" ALE Settings
" =======================================================
