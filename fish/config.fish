if status is-interactive
    # Commands to run in interactive sessions can go here
end

# NVM Start Node
set -x nvm_default_version '23.7'
nvm use $nvm_default_version
# END NVM

# START -> REACT NATIVE ANDROID ENVIRONMENT
set -x JAVA_HOME /Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
set -x ANDROID_HOME $HOME/Library/Android/sdk
set -x ANDROID_HOME $HOME/Library/Android/sdk
set -x ASPNETCORE_ENVIRONMENT 'Local'
set -x PATH $PATH $ANDROID_HOME/emulator $ANDROID_HOME/platform-tools

# END

# PATH to rbenv
set -gx PATH /opt/homebrew/bin/rbenv $PATH
rbenv init - | source

# abbreviations
abbr --add vwebdoc cd ~/Projects/ventas-web-doc
abbr --add vweb cd ~/Projects/ventas-web
abbr --add vapp cd ~/Projects/ventas-app
abbr --add vapi cd ~/Projects/ventas-api
abbr --add pweb cd ~/Projects/portal-web

abbr --add gsw git switch
abbr --add gswc git switch -c
abbr --add gch git checkout -b
abbr --add gcm git commit -m
abbr --add gcne git commit --amend --no-edit
abbr --add gcp git cherry-pick
abbr --add glo git pull origin
abbr --add gpo git push origin
abbr --add ys yarn start
abbr --add ysc yarn start --reset-cache
abbr --add gf git fetch -p -a
abbr --add vw yarn vitest --watch
abbr --add vc yarn vitest --coverage

starship init fish | source

# Added by `rbenv init` on Wed Jan 22 16:16:39 -03 2025
status --is-interactive; and rbenv init - --no-rehash fish | source

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
if test -f /opt/anaconda3/bin/conda
    eval /opt/anaconda3/bin/conda "shell.fish" "hook" $argv | source
else
    if test -f "/opt/anaconda3/etc/fish/conf.d/conda.fish"
        . "/opt/anaconda3/etc/fish/conf.d/conda.fish"
    else
        set -x PATH "/opt/anaconda3/bin" $PATH
    end
end
# <<< conda initialize <<<


# Adiciona SonarScanner CLI ao PATH
set -x PATH $PATH /Users/jean.santo/Downloads/FireShot/sonar-scanner

