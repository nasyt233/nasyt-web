dpkg-scanpackages --multiversion . /dev/null | gzip -9c > Packages.gz
nasyt -n $PWD index.html
