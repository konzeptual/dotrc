#!/bin/bash
###########################################################
# Script to create links in homed directory to files,
# starting with dot in a current directory
# YOU SHOULD START it from .dotrc directory!
###########################################################

backup_dir='/tmp/rc_backup'
# files, started with dot, except git related fiels
rc_files=`ls -A | grep -v git | grep ^[\.]`

read -p "We are going to trash following files in your home dir:
$rc_files
and create links to the current rc_files. ok? Y/n " sure
if [[ "$sure" == 'y' || "$sure" == '' ]]; then
    mkdir -p $backup_dir
    for file in $rc_files ; do
	echo $file
	mv $HOME/$file $backup_dir
	ln -s $PWD/$file $HOME/$file
    done
    echo 'Done. files backuped to '$backup_dir
else
    echo 'canceled'
fi
