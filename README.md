<h3>Инструметы, используемые для реализации проекта</h3>
<strong>Среда разработки:</strong> IntelliJ IDEA 2023.3.4.<br>
<strong>Операционная система</strong>: Windows 11 с установленным WSL2 и Docker Desktop.<br>
<strong>Способ установки PostgreSQL</strong>: в операционную систему.<br>

<h3>Основные команды для работы с ситсемой контроля версий Git</h3>
Настройка:
<ul>
<li><strong>git config --global user.name &lt name &gt</strong> - задает имя пользоватьеля для коммитов</li>
<li><strong>git config --global user.email &lt email &gt</strong> - задает почту пользоватьеля для коммитов</li>
</ul>

Работа с репозиторием:
<ul>
<li><strong>git init</strong> - инициализация репозитория</li>
<li><strong>git clone &lt URL &gt</strong> - клонирование удалённого репозитория</li>
</ul>
Работа с изменениями:
<ul>
<li><strong>git status</strong> - показывает изменения и их статус</li>
<li><strong>git add &lt file &gt</strong> - добавить один файл в коммит</li>
<li><strong>git add .</strong> - добавить все файлы в коммит</li>
<li><strong>git commit -m "Описание коммита"</strong> - фиксация изменений
<li><strong>git commit --amend -m "Новое описание"</strong> - изменение последнего коммита (если он еще не запушен)</li>
</ul>
Работа с ветками:
<ul>git reset --soft HEAD~1

<li><strong>git branch</strong> - показывает список локальных веток</li>
<li><strong>git branch &lt name &gt</strong> - создание новой ветки</li>
<li><strong>git switch &lt name &gt</strong> - переключение между ветками</li>
<li><strong>git switch -c &lt name &gt</strong> - создание и переключение в новую ветку</li>
<li><strong>git branch -d &lt name &gt</strong> - удаляет локальную ветку, если она уже слита в основную</li>
<li><strong>git branch -D &lt name &gt</strong> - принудительно удаляет ветку, даже если она не была слита</li>
<li><strong>git merge &lt name &gt</strong> - слияение ветки с текущей</li>
</ul>
Работа с удалённым репозиторием:
<ul>
<li><strong>git remote add origin &lt URL &gt</strong> - добавление удаленного репозитория</li>
<li><strong>git remote -v</strong> - просмотр удаленных репозиториев</li>
<li><strong>git push -u origin &lt branch &gt</strong> - отправка изменений на сервер</li>
<li><strong>git pull origin &lt branch &gt</strong> - получение изменений</li>
<li><strong>git fetch origin</strong> - копирование изменений без автоматического слияния</li>
</ul>
Откат изменений:
<ul>
<li><strong>git checkout -- &lt file &gt</strong> - отменяет изменения в файле</li>
<li><strong>git reset --soft HEAD~1</strong> - удаляет последний коммит, оставляя файлы</li>
<li><strong>git reset --hard HEAD~1</strong> - полностью удаляет коммит и файлы</li>
<li><strong>git clean -df</strong> - удаление локальных изменений</li>
</ul>
Работа с тегами:
<ul>
<li><strong>git tag &lt tag &gt</strong> - создание тега</li>
<li><strong>git tag -a &lt tag &gt -m "Релиз версии 1.0.0"</strong> - создание тега с описанием</li>
<li><strong>git tag</strong> - посмотр списка тегов</li>
<li><strong>git push origin &lt tag &gt</strong> - отправить тег в удаленный репозиторий</li>
<li><strong>git push origin --tags</strong>- отправить все теги в удаленный репозиторий</li>
<li><strong>git checkout -b &lt branch &gt &lt tag &gt</strong> - переключиться на тег для паботы в новой ветке</li>
<li><strong>git tag -d v1.0.0</strong> - удалить тег локально</li>
<li><strong>git push origin --delete v1.0.0</strong> - удалить тег на удалённом репозитории</li>
</ul>

