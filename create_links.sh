#!/bin/bash
backup_dir='/tmp/rc_backup'
rc_files=`ls -A | grep -v git | grep ^[\.]`

read -p "We are going to trash following files in your home dir:
$rc_files
and create links to the current rc_files. ok? Y/n " sure
if [[ "$sure" == 'y' || "$sure" == '' ]]; then
    mkdir -p $backup_dir
    # echo all files, started with dot, exept git related fiels
    for file in $rc_files ; do
	echo $file
	mv $HOME/$file $backup_dir
	ln -s $PWD/$file $HOME/$file
    done
    echo 'Done. files backuped to '$backup_dir
else
    echo 'canceled'
fi
