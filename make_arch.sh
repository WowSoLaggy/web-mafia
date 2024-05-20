#!/bin/bash

# Указываем имя архива
archive_name="filtered_archive.zip"

# Удаляем старый архив, если он существует
if [ -f "$archive_name" ]; then
  rm "$archive_name"
fi

# Проверяем доступность 7z
if ! command -v 7z &> /dev/null; then
    echo "7z не найден. Убедитесь, что 7-Zip установлен и путь к нему добавлен в переменную PATH."
    exit 1
fi

# Создаем временный файл для списка файлов
temp_file=$(mktemp)

# Находим все файлы с указанными расширениями, игнорируя папки node_modules, и записываем их в temp_file
find . -type d -name "node_modules" -prune -o -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" \) -print | sed 's|^\./||' > "$temp_file"

# Выводим список файлов, которые будут заархивированы
echo "Список файлов для архивации:"
cat "$temp_file"

# Создаем новый архив с указанными файлами, сохраняя структуру каталогов
7z a "$archive_name" @"$temp_file"

# Удаляем временный файл
rm "$temp_file"

echo "Архив $archive_name успешно создан."
