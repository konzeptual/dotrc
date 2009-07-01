# If not running interactively, don't do anything
[ -z "$PS1" ] && return

# don't put duplicate lines in the history. See bash(1) for more options
export HISTCONTROL=ignoredups
# ... and ignore same sucessive entries.
export HISTCONTROL=ignoreboth

export ALTERNATE_EDITOR=emacs EDITOR="emacsclient -nw" VISUAL="emacsclient"

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "$debian_chroot" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

#set a fancy prompt (non-color, unless we know we "want" color)
# case "$TERM" in
# xterm-color)
#     PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
#     ;;
# *)
#     PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
#     ;;
# esac

# If we are at home - do not show username and host
if [ $HOSTNAME == 'aldan' ]; then
    PS1='${debian_chroot:+($debian_chroot)}[\[\033[01;34m\]\w\[\033[00m\]]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:[\[\033[01;34m\]\w\[\033[00m\]]\$ '
fi

# If this is an xterm set the title to user@host:dir
case "$TERM" in
    xterm*|rxvt*)
	PROMPT_COMMAND='echo -ne "\033]0;${USER}@${HOSTNAME}: ${PWD/$HOME/~}\007"'
	;;
    *)
	;;
esac

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi


# do not follow sym links
set -P

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
fi

# testing
export RSPEC=true
# http://wiki.github.com/aslakhellesoy/cucumber/autotest-integration
export AUTOFEATURE=true

if [ -f "$HOME/.bash_env" ]; then
    . "$HOME/.bash_env"
fi

