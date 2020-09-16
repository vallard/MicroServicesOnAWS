.PHONY: all build push

all: build push

build:
	yarn run build

push:
	aws s3 cp build s3://photos.castlerock.ai --recursive --acl public-read
