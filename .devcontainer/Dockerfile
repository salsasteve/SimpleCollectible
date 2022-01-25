FROM ubuntu:latest

# Configure apt
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
  apt-get install -y sudo \
  curl \
  git-core \
  gnupg \
  locales \
  zsh \
  wget \
  software-properties-common \
  vim \
  fonts-powerline \
  python3.8 \
  python3-pip \
  # set up locale
  && locale-gen en_US.UTF-8

#PREP vim install plug, and solidity syntax
#RUN curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
RUN git clone https://github.com/tomlion/vim-solidity.git ~/.vim/bundle/vim-solidity

# set home
ENV HOME /home

ENV TERM xterm

# Set the default shell to bash rather than sh
ENV SHELL /bin/zsh

# installing NVM, Node LTS, NPM
ENV NVM_DIR $HOME/nvm
ENV NODE_VERSION 16.13.2

WORKDIR $NVM_DIR

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# confirm installation
WORKDIR $HOME/app/epic-nfts
RUN npm init -y
RUN npm install --save-dev hardhat
#RUN npm hardhat

RUN node -v
RUN npm -v

RUN npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
RUN npm install @openzeppelin/contracts

# run the oh-my-zsh installation script  
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

# install powerlevel10k
RUN git clone https://github.com/romkatv/powerlevel10k.git ~/.oh-my-zsh/custom/themes/powerlevel10k

RUN cd $HOME && curl -fsSLO https://raw.githubusercontent.com/romkatv/dotfiles-public/master/.purepower

COPY . $HOME
RUN pip3 install -r $HOME/app/requirements.txt

# zsh configuration
COPY .zshrc $HOME
COPY .p10k.zsh $HOME
COPY .vimrc $HOME

ENTRYPOINT $SHELL
