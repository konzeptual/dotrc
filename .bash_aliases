# enable color support of ls and also add handy aliases
[ -z "$PS1" ] && return
# if [ "$TERM" != "dumb" ]; then
    eval "`dircolors -b`"
    alias ls='ls --color=auto -h'
    #alias dir='ls --color=auto --format=vertical'
    #alias vdir='ls --color=auto --format=long'
    alias ll='ls -l'
    alias l='ll'
    alias la='ll -a'
    alias s="cd .."
    cd_ls () { cd ${1} ; ls -l --color ; }
    alias cd='cd_ls'
    alias cdd='cd -'
# fi


alias UNI='ssh antipin@141.2.243.3 -p 6942 -Y'
alias GSI='ssh kantipin@lxg1410.gsi.de'
alias CERN='ssh kantipin@lxplus.cern.ch -Y'
alias HLTdev='ssh -p 10000 antipin@localhost -Y'
alias pc7='ssh antipin@141.2.243.7 -Y'
alias pch='ssh antipin@141.2.243.61 -Y'

alias aldan_intovps='ssh konsty@89.33.197.84'
alias aldan_intovps_git='ssh git@89.33.197.84'

alias e='emacsclient'
alias eb='emacsclient -nw'
alias es='sudo emacs -nw --no-init-file'
alias argouml='java -jar /home/kons/distrib/dev/argouml/argouml-0.28/argouml.jar'
alias trash="mv -t ~/.local/share/Trash/files --backup=t"

alias nginx_check_conf="sudo /opt/local/nginx/sbin/nginx -c /opt/local/nginx/conf/nginx.conf -t"

## WebDev
alias phpcs='phpcs --extensions=php'
alias sf='php symfony'

# show progress on copying
# http://digg.com/d1KnBp
cp_p()
{
    strace -q -ewrite cp -- "${1}" "${2}" 2>&1 \
	| awk '{
        count += $NF
            if (count % 10 == 0) {
               percent = count / total_size * 100
               printf "%3d%% [", percent
               for (i=0;i<=percent;i++)
                  printf "="
               printf ">"
               for (i=percent;i<100;i++)
                  printf " "
               printf "]\r"
            }
         }
         END { print "" }' total_size=$(stat -c '%s' "${1}") count=0
}
